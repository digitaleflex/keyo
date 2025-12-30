"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Search, ShieldAlert, ShieldCheck, Link2, AlertOctagon, Loader2 } from "lucide-react"

export function PhishingScanner() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ status: 'safe' | 'suspicious' | 'danger' | null, message: string } | null>(null)

    const analyzeLink = () => {
        if (!url) return
        setLoading(true)
        setResult(null)

        // Simulation logic (Mocking a real analysis)
        setTimeout(() => {
            const lowerUrl = url.toLowerCase()
            let analysis: typeof result = { status: 'safe', message: "Ce lien semble légitime. Aucun marqueur de phishing détecté." }

            if (lowerUrl.includes("http:") && !lowerUrl.includes("https:")) {
                analysis = { status: 'suspicious', message: "Attention : Ce site n'utilise pas de connexion sécurisée (HTTPS)." }
            }
            else if (lowerUrl.includes("free") || lowerUrl.includes("gift") || lowerUrl.includes("urgent") || lowerUrl.includes("login")) {
                analysis = { status: 'suspicious', message: "Mots-clés suspects détectés (techique d'ingénierie sociale)." }
            }
            else if (lowerUrl.includes("paypal") || lowerUrl.includes("apple") || lowerUrl.includes("bank")) {
                // Mock detection of brand impersonation if not official domain (simplified)
                if (!lowerUrl.includes(".com") && !lowerUrl.includes(".fr")) {
                    analysis = { status: 'danger', message: "Haut risque : Tentative d'usurpation d'identité de marque (Phishing)." }
                }
            }

            // Random "danger" for demo purposes with specific test string
            if (url.includes("test-virus")) {
                analysis = { status: 'danger', message: "DANGER : Ce domaine est blacklisté dans les bases de données de sécurité." }
            }

            setResult(analysis)
            setLoading(false)
        }, 1500)
    }

    return (
        <Card className="w-full backdrop-blur-md bg-white/5 border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <Link2 className="h-5 w-5 text-purple-400" />
                    Scanner de Liens
                </CardTitle>
                <CardDescription className="text-xs">
                    Détectez les tentatives de phishing avant de cliquer.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Collez un lien suspect (ex: http://...)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="pl-9 bg-black/20 border-white/10"
                        />
                    </div>
                    <Button onClick={analyzeLink} disabled={loading || !url} size="icon" className="shrink-0 bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500/30">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>

                {result && (
                    <Alert className={`border ${result.status === 'safe' ? 'border-green-500/30 bg-green-500/10 text-green-300' :
                            result.status === 'suspicious' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300' :
                                'border-red-500/50 bg-red-500/10 text-red-400'
                        }`}>
                        {result.status === 'safe' ? <ShieldCheck className="h-4 w-4" /> :
                            result.status === 'suspicious' ? <AlertTriangle className="h-4 w-4" /> :
                                <AlertOctagon className="h-4 w-4" />}
                        <AlertTitle className="capitalize">{result.status === 'suspicious' ? 'Suspect' : result.status === 'danger' ? 'Dangereux' : 'Sûr'}</AlertTitle>
                        <AlertDescription className="text-xs opacity-90">
                            {result.message}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
