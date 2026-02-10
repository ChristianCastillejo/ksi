"use server";

import { z } from "zod";
import { Resend } from "resend";
import { type CartItem } from "@/features/cart/store";
import { getTranslations, getLocale } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export type CheckoutState = {
    errors?: { [key: string]: string[] };
    message?: string;
    success?: boolean;
    fields?: Record<string, string>;
    timestamp?: number;
};

export async function submitCheckoutForm(prevState: CheckoutState, formData: FormData): Promise<CheckoutState> {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "Checkout.server" });

    const checkoutSchema = z.object({
        name: z.string().min(2, t("errors.name")),
        email: z.string().email(t("errors.email")),
        phone: z.string().min(10, t("errors.phone")),
        address: z.string().min(10, t("errors.address")),
        city: z.string().min(2, t("errors.city")),
        state: z.string().min(2, t("errors.state")),
        pincode: z.string().min(6, t("errors.pincode")),
        cartItems: z.string().refine((val) => {
            try { JSON.parse(val); return true; } catch { return false; }
        }, t("errors.cartItems")),
    });

    const validatedFields = checkoutSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: t("messages.formErrors"),
            success: false,
            fields: Object.fromEntries(formData.entries()) as Record<string, string>,
            timestamp: Date.now(),
        };
    }

    const data = validatedFields.data;
    const items = JSON.parse(data.cartItems);
    const orderId = `IAT-${Math.floor(Math.random() * 1000000)}`;
    const totalAmount = items.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0);

    const itemsHtml = items.map((item: CartItem) => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.title} (x${item.quantity})</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
        </tr>
    `).join('');

    const customerHtml = `
        <div style="font-family: sans-serif; color: #1d1c1a; max-width: 600px; margin: 0 auto; border: 1px solid #ebebeb; padding: 40px; border-radius: 8px;">
            <h2 style="font-family: serif; color: #de6b48;">${t("email.title")}</h2>
            <p>${t("email.greeting", { name: data.name })}</p>
            <p>${t("email.thankYou")} (<strong>${orderId}</strong>) ${t("email.forwarded")}</p>
            <div style="background-color: #fbf9f6; padding: 15px; border-radius: 4px; margin: 20px 0; font-size: 14px;">
                <strong>${t("email.importantNoteTitle")}:</strong> ${t("email.importantNoteBody", { phone: data.phone })}
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                ${itemsHtml}
                <tr>
                    <td style="padding: 10px; font-weight: bold; text-align: right;">${t("email.totalEstimated")}:</td>
                    <td style="padding: 10px; font-weight: bold; text-align: right; color: #de6b48;">
                        ₹${totalAmount} <br/>
                        <span style="font-size: 10px; color: #5c5a56; font-weight: normal;">${t("email.shippingCost")}</span>
                    </td>
                </tr>
            </table>
            <p style="font-size: 12px; color: #5c5a56;">${t("email.shippingDetails")}: ${data.address}, ${data.city}, ${data.state} - ${data.pincode}</p>
        </div>
    `;

    const managerHtml = `
        <div style="font-family: sans-serif; color: #1d1c1a; max-width: 600px; padding: 20px;">
            <h2 style="color: #de6b48;">New Book Request: ${orderId}</h2>
            <p><strong>Customer:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>User Locale:</strong> ${locale.toUpperCase()}</p>
            <p><strong>Shipping To:</strong> ${data.address}, ${data.city}, ${data.state} - ${data.pincode} (INDIA)</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <h3>Requested Items:</h3>
            <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
            </table>
            <p style="margin-top: 20px; font-weight: bold;">
                Action Required: Contact customer to arrange payment (₹${totalAmount} + shipping cost, to be calculated based on location).
            </p>
        </div>
    `;

    try {
        const { data: resendData, error } = await resend.batch.send([
            {
                from: "Ishwar Ashram Trust <onboarding@resend.dev>",
                to: ["kashmirshaivainstituteweb@gmail.com"],
                subject: `${t("email.subject")} - ${orderId}`,
                html: customerHtml,
            },
            {
                from: "System Orders <onboarding@resend.dev>",
                to: ["kashmirshaivainstituteweb@gmail.com"],
                replyTo: data.email,
                subject: `ACTION REQUIRED: New Order ${orderId} from ${data.name}`,
                html: managerHtml,
            }
        ]);

        if (error) {
            console.error("❌ Resend API Error:", error);
            return {
                success: false,
                message: t("messages.resendError", { error: error.message }),
                fields: Object.fromEntries(formData.entries()) as Record<string, string>,
                timestamp: Date.now(),
            };
        }

        console.log("✅ Correos enviados con éxito a Resend. Data:", resendData);

        return {
            success: true,
            message: t("messages.success"),
            fields: {},
            timestamp: Date.now(),
        };

    } catch (error: unknown) {
        console.error("❌ Server Crash Error:", error);
        return {
            success: false,
            message: t("messages.internalError"),
            fields: Object.fromEntries(formData.entries()) as Record<string, string>,
            timestamp: Date.now(),
        };
    }
}