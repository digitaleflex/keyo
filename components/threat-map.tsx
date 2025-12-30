"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Crosshair, ShieldAlert, Activity } from "lucide-react"

interface Attack {
    id: number
    source: { x: number; y: number; country: string }
    target: { x: number; y: number; country: string }
    type: string
    color: string
}

const LOCATIONS = [
    { x: 20, y: 30, country: "USA" },
    { x: 25, y: 70, country: "Brazil" },
    { x: 48, y: 20, country: "UK" },
    { x: 52, y: 25, country: "Germany" },
    { x: 75, y: 20, country: "Russia" },
    { x: 85, y: 35, country: "China" },
    { x: 80, y: 70, country: "Australia" },
    { x: 50, y: 50, country: "Africa" },
]

const ATTACK_TYPES = ["DDoS", "Malware", "Phishing", "SQL Injection", "Ransomware"]
const COLORS = ["#ef4444", "#f59e0b", "#a855f7", "#3b82f6", "#10b981"]

export function ThreatMap() {
    const [attacks, setAttacks] = useState<Attack[]>([])
    const [stats, setStats] = useState({ total: 12450, active: 42 })

    // Simulation loop
    useEffect(() => {
        const interval = setInterval(() => {
            const source = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
            const target = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]

            if (source === target) return

            const newAttack: Attack = {
                id: Date.now(),
                source,
                target,
                type: ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)],
                color: COLORS[Math.floor(Math.random() * COLORS.length)]
            }

            setAttacks(prev => [...prev.slice(-10), newAttack])
            setStats(prev => ({
                total: prev.total + 1,
                active: Math.floor(Math.random() * 20 + 30)
            }))
        }, 800)

        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="w-full bg-black/40 border-white/10 backdrop-blur-xl overflow-hidden flex flex-col min-h-[500px] relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black/0 to-black/0 pointer-events-none" />

            <CardHeader className="flex flex-row items-center justify-between z-10">
                <div>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-widest uppercase text-red-500">
                        <Activity className="h-6 w-6 animate-pulse" />
                        Live Threat Map
                    </CardTitle>
                    <CardDescription className="font-mono text-xs">
                        Real-time Cyber Attack Monitoring
                    </CardDescription>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-xs text-muted-foreground uppercase">Total Attacks</div>
                        <div className="text-xl font-mono font-bold text-white">{stats.total.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-muted-foreground uppercase">Active Threats</div>
                        <div className="text-xl font-mono font-bold text-red-500 animate-pulse">{stats.active}</div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 relative min-h-[400px] p-0">
                {/* World Map Background (Generalized SVG dots) */}
                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Simple grid to simulate map texture */}
                        <defs>
                            <pattern id="grid" width="2" height="2" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="0.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* Approximate Continent Shapes for visual context */}
                        <path d="M10,20 Q30,10 40,40 T20,70 Z" fill="rgba(255,255,255,0.1)" /> {/* Americas */}
                        <path d="M45,15 Q65,10 70,30 T55,60 Z" fill="rgba(255,255,255,0.1)" /> {/* EMEA */}
                        <path d="M75,15 Q95,10 95,40 T75,60 Z" fill="rgba(255,255,255,0.1)" /> {/* APAC */}
                    </svg>
                </div>

                {/* Attack Animations */}
                <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                    {attacks.map(attack => (
                        <div key={attack.id} className="absolute inset-0 w-full h-full">
                            {/* Source Ping */}
                            <div
                                className="absolute w-2 h-2 rounded-full border border-white animate-ping"
                                style={{ left: `${attack.source.x}%`, top: `${attack.source.y}%`, borderColor: attack.color }}
                            />
                            {/* Target Ping */}
                            <div
                                className="absolute w-3 h-3 rounded-full bg-red-500/50 animate-pulse"
                                style={{ left: `${attack.target.x}%`, top: `${attack.target.y}%` }}
                            />

                            {/* Attack Line (SVG for simplicity) */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible">
                                <line
                                    x1={`${attack.source.x}%`}
                                    y1={`${attack.source.y}%`}
                                    x2={`${attack.target.x}%`}
                                    y2={`${attack.target.y}%`}
                                    stroke={attack.color}
                                    strokeWidth="1"
                                    strokeOpacity="0.6"
                                    strokeDasharray="5,5"
                                >
                                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" />
                                    <animate attributeName="opacity" values="1;0" dur="1.5s" fill="freeze" />
                                </line>
                            </svg>

                            {/* Label */}
                            <div
                                className="absolute text-[10px] font-mono font-bold px-1 bg-black/80 rounded border"
                                style={{
                                    left: `${(attack.source.x + attack.target.x) / 2}%`,
                                    top: `${(attack.source.y + attack.target.y) / 2}%`,
                                    color: attack.color,
                                    borderColor: attack.color
                                }}
                            >
                                {attack.type}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                    {attacks.slice(-3).reverse().map(attack => (
                        <Badge key={attack.id} variant="outline" className="bg-black/80 border-white/10 text-[10px] font-mono animate-in slide-in-from-left-2">
                            <span style={{ color: attack.color }}>●</span> {attack.source.country} ➔ {attack.target.country} : {attack.type}
                        </Badge>
                    ))}
                </div>

            </CardContent>
        </Card>
    )
}
