import { BlogCards } from "@/components/blog-cards"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Actualités Cybersécurité - Keyo",
    description: "Les dernières news tech et sécurité par ZATAZ et Korben.",
}

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Actualités & Veille</h1>
                <p className="text-muted-foreground">
                    Restez informé des dernières menaces et innovations technologiques.
                </p>
            </div>
            <BlogCards />
        </div>
    )
}
