"use client"

import { useState } from "react"
import { resetPassword } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Loader2, Lock } from "lucide-react"
import { toast } from "sonner"
import { AuthCard } from "./auth-card"
import { InputField } from "./input-field"

export function ResetPasswordForm() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas")
            return
        }
        setLoading(true)
        try {
            await resetPassword({
                newPassword: password,
            }, {
                onRequest: () => setLoading(true),
                onSuccess: () => {
                    toast.success("Mot de passe mis à jour")
                    setLoading(false)
                    window.location.href = "/login"
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
        <AuthCard title="Nouveau mot de passe" description="Sécurisez votre compte">
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    id="password"
                    label="Nouveau mot de passe"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    icon={Lock}
                />
                <InputField
                    id="confirmPassword"
                    label="Confirmer le mot de passe"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    icon={Lock}
                />
                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Réinitialiser"}
                </Button>
            </form>
        </AuthCard>
    )
}
