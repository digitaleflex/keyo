"use client"

import { ShieldCheck } from "lucide-react"

export function AuthCard({ children, title, description }: { children: React.ReactNode, title: string, description: string }) {
    return (
        <div className="w-full max-w-md relative group">
            {/* Animated Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur mx-auto transition-opacity duration-500" />

            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center text-center mb-8 space-y-2">
                    <div className="p-3 bg-white/5 rounded-full border border-white/10 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {children}
            </div>
        </div>
    )
}
