"use client"

import { useState } from "react"
import { signIn, signUp, forgetPassword, resetPassword } from "@/lib/auth-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, User, ArrowRight, ShieldCheck, Github, Chrome } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

function AuthCard({ children, title, description }: { children: React.ReactNode, title: string, description: string }) {
    return (
        <div className="w-full max-w-md relative group">
            {/* Animated Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur mx-auto transition-opacity duration-500" />

            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center text-center mb-8 space-y-2">
                    <div className="p-3 bg-white/5 rounded-full border border-white/10 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {children}
            </div>
        </div>
    )
}

function SocialButtons() {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
                variant="outline"
                className="bg-zinc-900/50 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-11"
                onClick={async () => {
                    await signIn.social({
                        provider: "github",
                        callbackURL: "/tools"
                    })
                }}
            >
                <Github className="mr-2 h-4 w-4" />
                GitHub
            </Button>
            <Button
                type="button"
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-11 text-white hover:text-white"
                onClick={async () => {
                    await signIn.social({
                        provider: "google",
                        callbackURL: "/tools"
                    })
                }}
            >
                <Chrome className="mr-2 h-4 w-4" />
                Google
            </Button>
        </div>
    )
}

function Divider() {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/40 px-2 text-muted-foreground backdrop-blur-xl">Ou continuer avec</span>
            </div>
        </div>
    )
}

function InputField({ id, label, type, placeholder, value, onChange, icon: Icon }: any) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-xs font-medium text-muted-foreground ml-1">{label}</Label>
            <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 rounded-lg">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Icon className="h-4 w-4" />
                </div>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className="bg-white/5 border-white/10 pl-9 h-11 focus-visible:ring-0 focus-visible:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                />
            </div>
        </div>
    )
}

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
