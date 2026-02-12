"use server";

import { z } from "zod";
import { Resend } from "resend";
import { getTranslations, getLocale } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export type DonateState = {
    errors?: { [key: string]: string[] };
    message?: string;
    success?: boolean;
    fields?: Record<string, string>;
    timestamp?: number;
};

export async function submitDonationForm(prevState: DonateState, formData: FormData): Promise<DonateState> {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "Donate.server" });

    const donateSchema = z.object({
        organization: z.string().min(1, t("errors.organization")),
        name: z.string().min(2, t("errors.name")),
        email: z.string().email(t("errors.email")),
        phone: z.string().min(7, t("errors.phone")),
        pan: z.string().optional(),
        utr: z.string().min(5, t("errors.utr")),
        amount: z.string().min(1, t("errors.amount")),
        address: z.string().min(10, t("errors.address")),
        receipt: z.any()
            .refine((file) => file?.size <= MAX_FILE_SIZE, t("errors.fileSize"))
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                t("errors.fileType")
            )
            .optional(),
    });

    const data = {
        organization: formData.get("organization"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        pan: formData.get("pan"),
        utr: formData.get("utr"),
        amount: formData.get("amount"),
        address: formData.get("address"),
        receipt: formData.get("receipt"),
    };

    const validatedFields = donateSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: t("errors.general"),
            success: false,
            fields: Object.fromEntries(formData.entries()) as Record<string, string>,
            timestamp: Date.now(),
        };
    }

    const { organization, name, email, phone, pan, utr, amount, address, receipt } = validatedFields.data;

    let toEmail = "admin@ishwarashram.com";
    if (organization === "ksi") toEmail = "kashmirshaivainstitute@gmail.com";
    if (organization === "srinagar") toEmail = "iatsrinagar@gmail.com";
    if (organization === "delhi") toEmail = "iatdelhi@gmail.com";

    try {
        const { error } = await resend.emails.send({
            from: "Donation System <onboarding@resend.dev>",
            to: [toEmail],
            replyTo: email,
            subject: `New Donation Notification - ₹${amount} from ${name}`,
            text: `Organization: ${organization}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPAN/Aadhar: ${pan}\nUTR: ${utr}\nAmount: ₹${amount}\nAddress: ${address}\n\n*Receipt file handling should be implemented with Vercel Blob or AWS S3.*`,
        });

        if (error) {
            return {
                success: false,
                message: t("errors.resend", { error: error.message }),
                fields: Object.fromEntries(formData.entries()) as Record<string, string>,
                timestamp: Date.now(),
            };
        }

        return {
            success: true,
            message: t("successMessage"),
            fields: {},
            timestamp: Date.now(),
        };

    } catch (error: unknown) {
        return {
            success: false,
            message: t("errors.internal"),
            fields: Object.fromEntries(formData.entries()) as Record<string, string>,
            timestamp: Date.now(),
        };
    }
}