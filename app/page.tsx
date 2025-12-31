import { PasswordGenerator } from "@/components/password-generator"
import { SecurityInfo } from "@/components/security-info"
import { KeyoLogo } from "@/components/keyo-logo"
import { ToolsSection } from "@/components/sections/tools-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Newspaper } from "lucide-react"
import { SecurityTicker } from "@/components/security-ticker"
import prisma from "@/lib/db"
import ThreatRadar from "@/components/dashboard/threat-radar"
import IntelCard from "@/components/dashboard/intel-card"

export default async function Home() {
  // Fetch Intelligence Data
  const articles = await prisma.securityArticle.findMany({
    where: { status: "Published" },
    orderBy: { publishedAt: 'desc' },
    take: 6
  })

  // Normalize data for components
  const intelItems = articles.map(a => ({
    id: a.id,
    title: a.title,
    source: a.source,
    summary: a.summary,
    geminiScore: a.geminiScore,
    category: a.category,
    publishedAt: a.publishedAt,
    url: a.url
  }))

  return (
    <div className="w-full relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10 flex flex-col items-center">
        {/* Security Ticker */}
        <div className="w-full max-w-5xl mb-12 rounded-lg overflow-hidden border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <SecurityTicker />
        </div>

        {/* Hero Section */}
        <header className="text-center mb-12 space-y-4 flex flex-col items-center max-w-3xl">
          <KeyoLogo className="w-20 h-20 mb-6 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)] animate-float" />
          <div className="inline-block p-2 px-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium text-primary-foreground/80 mb-4">
            Sécurité Avancée
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight leading-tight mb-4">
            Keyo Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Bien plus qu'un générateur. Votre centre de commandement pour la sécurité numérique et la veille stratégique.
          </p>
        </header>

        {/* Threat Radar (Dashboard) */}
        <div className="w-full max-w-5xl mb-16">
          <ThreatRadar items={intelItems} />
        </div>

        {/* Password Generator */}
        <div className="mb-16">
          <PasswordGenerator />
        </div>

        {/* Intelligence Grid (Replaces BlogCards) */}
        <div className="w-full max-w-7xl mt-8">
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Newspaper className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Flux Intelligence <span className="text-sm font-normal text-muted-foreground ml-2">(Live)</span>
              </h2>
            </div>
            <Link href="/blog">
              <Button variant="ghost" className="gap-2 hover:bg-white/10 text-xs uppercase tracking-wider">
                Voir Tout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intelItems.map((item) => (
              <IntelCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Security Tools Section Wrapper */}
        <div className="w-full bg-black/20 backdrop-blur-sm mt-24 py-8 rounded-3xl border border-white/5 relative group max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />
          <ToolsSection />
          <div className="flex justify-center mt-4 relative z-10">
            <Link href="/tools">
              <Button variant="ghost" className="gap-2 hover:bg-white/10">
                Voir plus d'outils <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Security Information */}
        <div className="mt-24 w-full">
          <SecurityInfo />
        </div>
      </div>
    </div>
  )
}
