"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <nav className="flex items-center gap-6 text-sm">
                <Link
                    href="/"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Générateur
                </Link>
                <Link
                    href="/tools"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/tools") ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Outils Sécurité
                </Link>
                <Link
                    href="/blog"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/blog") ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Actualités
                </Link>
            </nav>
        </div>
    )
}
