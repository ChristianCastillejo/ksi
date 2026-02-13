"use server";

import { z } from "zod";
import { Resend } from "resend";
import { getTranslations, getLocale } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
    errors?: { [key: string]: string[] };
    message?: string;
    success?: boolean;
    fields?: Record<string, string>;
    timestamp?: number;
};

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "Contact.server" });

    const contactSchema = z.object({
        name: z.string().min(2, t("errors.name")),
        email: z.string().email(t("errors.email")),
        phone: z.string().optional(),
        organization: z.string().min(1, t("errors.organization")),
        subject: z.string().min(3, t("errors.subject")),
        message: z.string().min(10, t("errors.message")),
    });

    const validatedFields = contactSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: t("errors.general"),
            success: false,
            fields: Object.fromEntries(formData.entries()) as Record<string, string>,
            timestamp: Date.now(),
        };
    }

    const { name, email, phone, organization, subject, message } = validatedFields.data;

    let toEmail = "admin@ishwarashram.com";
    if (organization === "ksi") toEmail = "kashmirshaivainstituteweb@gmail.com";
    if (organization === "srinagar") toEmail = "iatsrinagar@gmail.com";
    if (organization === "delhi") toEmail = "iatdelhi@gmail.com";

    try {
        const { error } = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: [toEmail],
            replyTo: email,
            subject: ` ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDestination: ${organization}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend API Error:", error);
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
        console.error("Server Crash Error:", error);
        return {
            success: false,
            message: t("errors.internal"),
            fields: Object.fromEntries(formData.entries()) as Record<string, string>,
            timestamp: Date.now(),
        };
    }
}