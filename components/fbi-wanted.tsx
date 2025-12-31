"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Siren, ChevronLeft, ChevronRight, ExternalLink, Loader2, AlertTriangle } from "lucide-react"

interface Fugitive {
    uid: string
    title: string
    description: string
    images: { original: string }[]
    reward_text: string | null
    warning_message: string | null
    url: string
}

export function FbiWanted() {
    const [fugitives, setFugitives] = useState<Fugitive[]>([])
    const [loading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        // Fetch Cyber Crime wanted list
        fetch("https://api.fbi.gov/wanted/v1/list?field_offices=cyber")
            .then((res) => res.json())
            .then((data) => {
                // Filter out items without images
                const validItems = data.items.filter((item: any) => item.images && item.images.length > 0)
                setFugitives(validItems)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Failed to fetch FBI data", err)
                setLoading(false)
            })
    }, [])

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % fugitives.length)
    }

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + fugitives.length) % fugitives.length)
    }

    if (loading) {
        return (
            <Card className="w-full h-[500px] flex items-center justify-center backdrop-blur-md bg-white/5 border-white/10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
        )
    }

    if (fugitives.length === 0) {
        return (
            <Card className="w-full h-[500px] flex flex-col items-center justify-center backdrop-blur-md bg-white/5 border-white/10 text-center p-6">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-white mb-2">Aucune Donnée Disponible</h3>
                <p className="text-muted-foreground max-w-sm">Impossible de charger le flux FBI pour le moment. Vérifiez votre connexion ou réessayez plus tard.</p>
                <Button variant="outline" onClick={() => window.location.reload()} className="mt-6 border-white/10 hover:bg-white/10">
                    Actualiser
                </Button>
            </Card>
        )
    }

    const current = fugitives[index]

    return (
        <Card className="w-full h-full min-h-[500px] backdrop-blur-md bg-white/5 border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 opacity-80" />

            <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-red-500">
                        <Siren className="h-6 w-6 animate-pulse" />
                        FBI CYBER WANTED
                    </CardTitle>
                    <CardDescription className="text-xs font-mono text-red-400/80 uppercase tracking-widest">
                        Most Wanted Cyber Criminals
                    </CardDescription>
                </div>
                <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-500/10 animate-pulse">
                    LIVE FEED
                </Badge>
            </CardHeader>

            <CardContent className="relative z-10 flex-1 flex flex-col items-center justify-end pb-8 text-center px-6">
                {/* Background Image Effect */}
                <div
                    className="absolute inset-0 md:inset-x-12 md:inset-y-12 bg-cover bg-center opacity-20 -z-10 rounded-xl blur-sm grayscale contrast-125"
                    style={{ backgroundImage: `url(${current.images[0].original})` }}
                />

                {/* Main Image */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-lg overflow-hidden border-2 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <img
                        src={current.images[0].original}
                        alt={current.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    {current.warning_message && (
                        <div className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-[10px] uppercase font-bold py-1">
                            {current.warning_message}
                        </div>
                    )}
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-2 line-clamp-2">
                    {current.title}
                </h3>

                <p className="text-xs md:text-sm text-balance text-muted-foreground mb-4 line-clamp-3 md:line-clamp-4 max-w-lg">
                    {current.description || "No description available."}
                </p>

                {current.reward_text && (
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold">
                        <AlertTriangle className="h-3 w-3" />
                        {current.reward_text.split("Reward:")[0].slice(0, 50)}...
                    </div>
                )}

                <div className="flex items-center gap-4 w-full justify-center">
                    <Button size="icon" variant="outline" onClick={prevSlide} className="rounded-full border-white/10 hover:bg-white/10">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button size="default" variant="destructive" asChild className="bg-red-600 hover:bg-red-700 px-8">
                        <a href={current.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            Voir Fiche Complète <ExternalLink className="h-3 w-3" />
                        </a>
                    </Button>

                    <Button size="icon" variant="outline" onClick={nextSlide} className="rounded-full border-white/10 hover:bg-white/10">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
