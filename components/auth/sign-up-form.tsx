"use client"

import { useState } from "react"
import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, Lock, User } from "lucide-react"
import { toast } from "sonner"
import { AuthCard } from "./auth-card"
import { InputField } from "./input-field"

export function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await signUp.email({
                email,
                password,
                name,
                callbackURL: "/tools"
            }, {
                onRequest: () => setLoading(true),
                onSuccess: () => {
                    toast.success("Compte créé avec succès")
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
        <AuthCard title="Créer un compte" description="Démarrez votre sécurité dès maintenant">
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    id="name"
                    label="Nom complet"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    icon={User}
                />
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    icon={Mail}
                />
                <InputField
                    id="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    icon={Lock}
                />

                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 mt-2" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Créer mon compte"}
                </Button>
            </form>
        </AuthCard>
    )
}
