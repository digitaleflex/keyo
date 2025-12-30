"use client"

import { useState } from "react"
import { forgetPassword } from "@/lib/auth-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { AuthCard } from "./auth-card"
import { InputField } from "./input-field"

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await forgetPassword({
                email,
                redirectTo: "/reset-password"
            }, {
                onRequest: () => setLoading(true),
                onSuccess: () => {
                    toast.success("Email envoyé s'il existe dans notre base.")
                    setLoading(false)
                },
                onError: (ctx: any) => {
                    toast.error(ctx.error.message)
                    setLoading(false)
                }
            })
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <AuthCard title="Mot de passe oublié" description="Nous vous enverrons un lien de récupération">
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    icon={Mail}
                />
                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span className="flex items-center">Envoyer le lien <ArrowRight className="ml-2 h-4 w-4" /></span>}
                </Button>
            </form>
            <div className="text-center mt-4">
                <Link href="/login" className="text-xs text-muted-foreground hover:text-white transition-colors">
                    Retour à la connexion
                </Link>
            </div>
        </AuthCard>
    )
}
