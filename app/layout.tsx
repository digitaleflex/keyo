import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Keyo - Suite de Sécurité Numérique & Intelligence",
  description:
    "La plateforme ultime pour votre cybersécurité. Générateur de mots de passe, veille menaces en temps réel, et outils d'intelligence numérique.",
  generator: "v0.app",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
}

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <SiteHeader />
        <main className="flex-1 flex flex-col items-center">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
