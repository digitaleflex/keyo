import { ToolsSection } from "@/components/sections/tools-section"
import { DigitalFootprint } from "@/components/digital-footprint"
import { ThreatMap } from "@/components/threat-map"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Outils de Sécurité - Keyo",
    description: "Vérifiez si vos données ont fuité et analysez votre IP publique.",
}

export default function ToolsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2">
                Tableau de Bord
            </h1>
            <p className="text-muted-foreground mb-8">
                Vue d'ensemble de votre sécurité numérique et recommandations.
            </p>

            <DigitalFootprint />

            <div className="my-12">
                <ThreatMap />
            </div>

            <div className="my-12 border-t border-white/5" />

            <ToolsSection />
        </div>
    )
}
