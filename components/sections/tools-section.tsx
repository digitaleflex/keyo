import { LeakChecker } from "@/components/leak-checker"
import { IpChecker } from "@/components/ip-checker"
import { UsernameChecker } from "@/components/username-checker"
import { FbiWanted } from "@/components/fbi-wanted"
import { PhishingScanner } from "@/components/phishing-scanner"
import { SiteInspector } from "@/components/site-inspector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ToolsSection() {
    return (
        <section className="w-full max-w-7xl mx-auto py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Outils de Sécurité Avancés
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Une suite complète pour investiguer, vérifier et se protéger.
                </p>

                <Tabs defaultValue="all" className="w-full max-w-md mx-auto mb-8">
                    <TabsList className="grid w-full grid-cols-2 bg-white/5">
                        <TabsTrigger value="all">Tous les Outils</TabsTrigger>
                        <TabsTrigger value="investigation">Analyse & Enquête</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Core Tools */}
                <div className="h-full">
                    <LeakChecker />
                </div>
                <div className="h-full">
                    <IpChecker />
                </div>
                <div className="h-full">
                    <UsernameChecker />
                </div>

                {/* Advanced Tools */}
                <div className="h-full md:col-span-2 lg:col-span-2 min-h-[500px]">
                    <FbiWanted />
                </div>
                <div className="h-full flex flex-col gap-6">
                    <PhishingScanner />
                    <SiteInspector />
                </div>
            </div>
        </section>
    )
}
