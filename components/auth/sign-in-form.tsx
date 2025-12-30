"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { AuthCard } from "./auth-card"
import { SocialButtons } from "./social-buttons"
import { Divider } from "./divider"
import { InputField } from "./input-field"

export function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await signIn.email({
                email,
                password,
                callbackURL: "/tools"
            }, {
                onRequest: () => setLoading(true),
                onSuccess: () => {
                    toast.success("Connexion réussie")
                    setLoading(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                    setLoading(false)
                }
            })
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <AuthCard title="Connexion" description="Accédez à votre espace sécurisé">
            <SocialButtons />
            <Divider />
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

                <div className="space-y-2">
                    <InputField
                        id="password"
                        label="Mot de passe"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        icon={Lock}
                    />
                    <div className="text-right">
                        <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                            Mot de passe oublié ?
                        </Link>
                    </div>
                </div>

                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Se connecter"}
                </Button>
            </form>
        </AuthCard>
    )
}
