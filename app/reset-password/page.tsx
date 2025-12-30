import { ResetPasswordForm } from "@/components/auth-components"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Nouveau mot de passe - Keyo",
    description: "Définissez votre nouveau mot de passe.",
}

export default function ResetPasswordPage() {
    return (
        <div className="container mx-auto flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Sécurité</h1>
                <p className="text-muted-foreground">Choisissez un mot de passe fort.</p>
            </div>

            <ResetPasswordForm />
        </div>
    )
}
