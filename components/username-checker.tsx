"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Globe, CheckCircle, XCircle, Loader2 } from "lucide-react"

type PlatformStatus = 'available' | 'taken' | 'error' | 'loading' | 'idle'

interface PlatformResult {
    name: string
    url: string
    status: PlatformStatus
}

const PLATFORMS = [
    { name: "GitHub", urlTemplate: "https://github.com/" },
    { name: "Twitter", urlTemplate: "https://twitter.com/" },
    { name: "Instagram", urlTemplate: "https://instagram.com/" },
    { name: "Facebook", urlTemplate: "https://facebook.com/" },
]

export function UsernameChecker() {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<PlatformResult[]>(
        PLATFORMS.map(p => ({ ...p, url: "", status: 'idle' }))
    )

    const checkUsername = async () => {
        if (!username) return
        setLoading(true)

        // Reset statuses
        setResults(prev => prev.map(p => ({ ...p, status: 'loading', url: p.urlTemplate + username })))

        // Simulate API calls (Real implementation would use a proxy to avoid CORS)
        // We'll use a random simulation for demo purposes
        const newResults = await Promise.all(
            PLATFORMS.map(async (platform) => {
                await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000))
                // Mock logic: 
                // "admin", "test", "root" are taken everywhere.
                // Random chance for others.
                const isTaken = ["admin", "test", "root", "user"].includes(username) || Math.random() > 0.7
                return {
                    name: platform.name,
                    urlTemplate: platform.urlTemplate,
                    url: platform.urlTemplate + username,
                    status: isTaken ? 'taken' : 'available' as PlatformStatus
                }
            })
        )

        setResults(newResults)
        setLoading(false)
    }

    return (
        <Card className="w-full backdrop-blur-md bg-white/5 border-white/10 shadow-2xl relative overflow-hidden">
            {/* Terminal Aesthetic Overlay */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    <Globe className="h-6 w-6 text-emerald-400" />
                    Scanner de Pseudo (OSINT)
                </CardTitle>
                <CardDescription className="text-muted-foreground/80 font-mono text-xs">
                    $ check-username --target="{username || "..."}"
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-2.5 text-muted-foreground font-mono text-sm">{">"}</span>
                        <Input
                            placeholder="Entrez un pseudo..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="pl-8 bg-black/40 border-emerald-500/20 focus-visible:ring-emerald-500/50 font-mono text-emerald-100 placeholder:text-muted-foreground/50"
                            onKeyDown={(e) => e.key === "Enter" && checkUsername()}
                        />
                    </div>
                    <Button
                        onClick={checkUsername}
                        disabled={loading || !username}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/50"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {results.map((platform) => (
                        <div
                            key={platform.name}
                            className="flex items-center justify-between p-3 rounded bg-black/20 border border-white/5"
                        >
                            <span className="text-sm font-medium">{platform.name}</span>
                            <div className="flex items-center gap-2">
                                {platform.status === 'idle' && <span className="text-xs text-muted-foreground">-</span>}
                                {platform.status === 'loading' && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
                                {platform.status === 'available' && (
                                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                                        <CheckCircle className="h-3 w-3" />
                                        <span>Free</span>
                                    </div>
                                )}
                                {platform.status === 'taken' && (
                                    <div className="flex items-center gap-1.5 text-red-400 text-xs font-mono">
                                        <XCircle className="h-3 w-3" />
                                        <span>Taken</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
