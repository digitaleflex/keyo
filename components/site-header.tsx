import Link from "next/link"
import { KeyoLogo } from "@/components/keyo-logo"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center w-full max-w-7xl mx-auto px-4">
                <div className="mr-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <KeyoLogo className="h-8 w-8" />
                        <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Keyo</span>
                    </Link>
                </div>
                <MainNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search could go here */}
                    </div>
                    <nav className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2 mr-2">
                            <Button variant="ghost" asChild className="text-muted-foreground hover:text-white">
                                <Link href="/login">Connexion</Link>
                            </Button>
                            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                                <Link href="/register">S'inscrire</Link>
                            </Button>
                        </div>

                        <div className="h-6 w-px bg-border/50 hidden md:block" />

                        <Link
                            href="https://github.com/digitaleflex/keyo"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
