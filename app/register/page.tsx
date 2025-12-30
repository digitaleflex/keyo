import { SignUpForm } from "@/components/auth-components"
import { Metadata } from "next"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
    title: "Inscription - Keyo",
    description: "Créez votre compte sécurisé.",
}

export default function RegisterPage() {
    return (
        <div className="container relative h-[calc(100vh-80px)] flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r dark:border-white/10 md:flex">
                <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 via-cyan-500/20 to-emerald-500/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] opacity-20" />
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Shield className="mr-2 h-6 w-6 text-blue-500" />
                    Protection Avancée
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Prenez le contrôle de votre empreinte numérique dès aujourd'hui. Rejoignez les milliers d'utilisateurs qui sécurisent leur vie en ligne.&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 flex items-center justify-center h-full">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-white">
                            Créer un compte
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Entrez vos informations ci-dessous pour démarrer.
                        </p>
                    </div>
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}
