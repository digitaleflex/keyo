"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert, ShieldCheck, Search, Loader2 } from "lucide-react"

async function checkPasswordLeak(password: string): Promise<number> {
    if (!password) return 0

    // Hash password with SHA-1
    const msgBuffer = new TextEncoder().encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase()

    const prefix = hashHex.slice(0, 5)
    const suffix = hashHex.slice(5)

    try {
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
        if (!response.ok) throw new Error("API Error")

        const text = await response.text()
        const lines = text.split("\n")

        for (const line of lines) {
            const [hashSuffix, count] = line.split(":")
            if (hashSuffix === suffix) {
                return parseInt(count, 10)
            }
        }
    } catch (error) {
        console.error("Failed to check password leak", error)
    }

    return 0
}

export function LeakChecker() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ type: 'safe' | 'danger' | null, message: string, count?: number }>({ type: null, message: "" })

    const handleEmailCheck = async () => {
        setLoading(true)
        // Simulation for Email (Requires API Key for real HIBP)
        setTimeout(() => {
            if (email === "test@test.com") {
                setResult({ type: 'danger', message: "Cet email apparaît dans 12 fuites de données connues !" })
            } else {
                setResult({ type: 'safe', message: "Aucune fuite détectée pour cet email (Base de données Demo)." })
            }
            setLoading(false)
        }, 1500)
    }

    const handlePasswordCheck = async () => {
        if (!password) return
        setLoading(true)
        const count = await checkPasswordLeak(password)
        setLoading(false)

        if (count > 0) {
            setResult({
                type: 'danger',
                message: `Ce mot de passe a été exposé ${count.toLocaleString()} fois !`,
                count
            })
        } else {
            setResult({
                type: 'safe',
                message: "Ce mot de passe n'a pas été trouvé dans les bases de données publiques."
            })
        }
    }

    return (
        <Card className="w-full backdrop-blur-md bg-white/5 border-white/10 shadow-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    <ShieldAlert className="h-6 w-6 text-red-400" />
                    Vérificateur de Fuites
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">
                    Vérifiez si vos identifiants ont été compromis dans une fuite de données connue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="password" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-black/20">
                        <TabsTrigger value="password">Mot de passe</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                    </TabsList>

                    <TabsContent value="password" className="space-y-4 mt-4">
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                placeholder="Entrez un mot de passe..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-black/10 border-white/10 focus-visible:ring-red-400/50"
                            />
                            <Button onClick={handlePasswordCheck} disabled={loading || !password} variant="destructive" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Note : Votre mot de passe n'est jamais envoyé en clair (k-anonymity SHA-1).
                        </p>
                    </TabsContent>

                    <TabsContent value="email" className="space-y-4 mt-4">
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-black/10 border-white/10 focus-visible:ring-red-400/50"
                            />
                            <Button onClick={handleEmailCheck} disabled={loading || !email} variant="outline" className="border-red-500/50 hover:bg-red-500/10 hover:text-red-400">
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vérifier"}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>

                {result.type && (
                    <Alert className={`mt-6 border ${result.type === 'safe' ? 'border-green-500/50 bg-green-500/10 text-green-400' : 'border-red-500/50 bg-red-500/10 text-red-400'}`}>
                        {result.type === 'safe' ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                        <AlertTitle>{result.type === 'safe' ? 'Sécurisé' : 'Compromis'}</AlertTitle>
                        <AlertDescription>
                            {result.message}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
