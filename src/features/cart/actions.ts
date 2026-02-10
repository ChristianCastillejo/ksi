"use server";

import { Resend } from 'resend';
import { OrderEmail } from './OrderEmail';
import { CartItem } from "./store";

const resend = new Resend(process.env.RESEND_API_KEY);



export async function sendOrderAction(cartData: { items: CartItem[], total: string }) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Kashmir Books <orders@yourdomain.com>',
            to: ['kashmirshaivainstituteweb@gmail.com'],
            subject: 'New Quote Request',
            react: OrderEmail({ items: cartData.items, total: cartData.total }),
        });

        if (error) return { success: false, error };
        return { success: true };
    } catch (err) {
        return { success: false, error: err };
    }
}