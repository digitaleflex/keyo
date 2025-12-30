import { SignInForm } from "@/components/auth-components"
import { Metadata } from "next"
import { ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
    title: "Connexion - Keyo",
    description: "Accédez à votre espace sécurisé.",
}

export default function LoginPage() {
    return (
        <div className="container relative h-[calc(100vh-80px)] flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r dark:border-white/10 md:flex">
                <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl opacity-20 animate-pulse" />
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <ShieldCheck className="mr-2 h-6 w-6 text-purple-500" />
                    Keyo Security
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;La sécurité n'est pas un produit, c'est un processus. Keyo vous donne les outils pour maîtriser ce processus.&rdquo;
                        </p>
                        <footer className="text-sm text-muted-foreground">L'équipe Keyo</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 flex items-center justify-center h-full">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-white">
                            Bon retour
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Entrez vos identifiants pour accéder au dashboard.
                        </p>
                    </div>
                    <SignInForm />
                </div>
            </div>
        </div>
    )
}
