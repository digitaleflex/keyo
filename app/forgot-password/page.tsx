import { ForgotPasswordForm } from "@/components/auth-components"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Mot de passe oublié - Keyo",
    description: "Réinitialisez votre mot de passe Keyo.",
}

export default function ForgotPasswordPage() {
    return (
        <div className="container mx-auto flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Récupération</h1>
                <p className="text-muted-foreground">Une procédure sécurisée pour retrouver votre accès.</p>
            </div>

            <ForgotPasswordForm />
        </div>
    )
}
