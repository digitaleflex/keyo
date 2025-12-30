import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend";
import db from "./db";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        async sendResetPassword({ url, user }: { url: string, user: any }) {
            if (!user || !user.email) return;
            await resend.emails.send({
                from: "noreply@net.eurinhash.com",
                to: user.email,
                subject: "Réinitialisation de mot de passe",
                html: `<p>Cliquez ici pour réinitialiser votre mot de passe : <a href="${url}">${url}</a></p>`,
            });
        },
        async sendVerificationEmail({ url, user }: { url: string, user: any }) {
            if (!user || !user.email) return;
            await resend.emails.send({
                from: "noreply@net.eurinhash.com",
                to: user.email,
                subject: "Vérifiez votre adresse email",
                html: `<p>Cliquez ici pour vérifier votre email : <a href="${url}">${url}</a></p>`,
            });
        },
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
});
