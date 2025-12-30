"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Server, Globe, Check, X, Shield, Search, Loader2 } from "lucide-react"

export function SiteInspector() {
    const [domain, setDomain] = useState("")
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState<any>(null)

    const inspectSite = () => {
        if (!domain) return
        setLoading(true)
        setReport(null)

        // Simulation logic
        setTimeout(() => {
            // Mock random score generator
            const score = Math.floor(Math.random() * (100 - 60) + 60)

            setReport({
                domain: domain.replace("https://", "").replace("http://", "").split("/")[0],
                score: score,
                ssl: true,
                headers: {
                    "Strict-Transport-Security": Math.random() > 0.3,
                    "Content-Security-Policy": Math.random() > 0.5,
                    "X-Frame-Options": true
                },
                server: "nginx/1.18.0 (Ubuntu)",
                ip: "104.21.73." + Math.floor(Math.random() * 255)
            })
            setLoading(false)
        }, 2000)
    }

    return (
        <Card className="w-full backdrop-blur-md bg-white/5 border-white/10 shadow-xl flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <Server className="h-5 w-5 text-cyan-400" />
                    Inspecteur Web
                </CardTitle>
                <CardDescription className="text-xs">
                    Analyse technique de sécurité (SSL, Headers).
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
                <div className="flex gap-2">
                    <Input
                        placeholder="domaine.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="bg-black/20 border-white/10"
                    />
                    <Button onClick={inspectSite} disabled={loading || !domain} size="icon" className="shrink-0 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>

                {report && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                            <span className="text-sm font-medium">Score de Sécurité</span>
                            <span className={`text-2xl font-black ${report.score > 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                                {report.score}/100
                            </span>
                        </div>

                        <div className="grid gap-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Lock className="h-3 w-3" /> SSL/TLS
                                </div>
                                <span className="text-green-400 flex items-center gap-1"><Check className="h-3 w-3" /> Valide</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Shield className="h-3 w-3" /> HSTS Header
                                </div>
                                {report.headers["Strict-Transport-Security"] ?
                                    <span className="text-green-400 flex items-center gap-1"><Check className="h-3 w-3" /> Actif</span> :
                                    <span className="text-red-400 flex items-center gap-1"><X className="h-3 w-3" /> Manquant</span>
                                }
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Globe className="h-3 w-3" /> Server IP
                                </div>
                                <span className="font-mono text-xs">{report.ip}</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
