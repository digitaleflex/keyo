"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, MapPin, Network, Lock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface IpInfo {
    ip: string
    city: string
    country_name: string
    org: string
}

export function IpChecker() {
    const [data, setData] = useState<IpInfo | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Failed to fetch IP info", err)
                setLoading(false)
            })
    }, [])

    return (
        <Card className="w-full h-full backdrop-blur-md bg-white/5 border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                    <Globe className="h-5 w-5 text-blue-400" />
                    Votre Identité Numérique
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4 bg-white/10" />
                        <Skeleton className="h-4 w-1/2 bg-white/10" />
                    </div>
                ) : data ? (
                    <>
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Adresse IP Publique</p>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                    {data.ip}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] border border-red-500/30">
                                    Visible
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                    <MapPin className="h-3 w-3" />
                                    Localisation
                                </div>
                                <p className="font-medium text-foreground">{data.city}, {data.country_name}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                    <Network className="h-3 w-3" />
                                    Fournisseur
                                </div>
                                <p className="font-medium text-foreground truncate" title={data.org}>{data.org}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="flex items-start gap-3 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                <Lock className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-blue-300 mb-0.5">Votre IP est exposée</p>
                                    <p className="text-[11px] text-blue-200/70 leading-relaxed">
                                        Les sites web peuvent voir votre localisation approximative. Utilisez un VPN pour masquer ces informations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-red-400 text-sm">Impossible de charger les informations IP.</p>
                )}
            </CardContent>
        </Card>
    )
}
