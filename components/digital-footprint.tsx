"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, ShieldAlert, ShieldCheck, RefreshCw, Activity, Save } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, RadarChart, PolarGrid, PolarRadiusAxis, Radar, Legend } from "recharts"

const initialData = [
    { subject: 'Mots de passe', A: 40, fullMark: 100 },
    { subject: 'Anonymat', A: 30, fullMark: 100 },
    { subject: 'Fuites Données', A: 20, fullMark: 100 },
    { subject: 'Sécurité Web', A: 50, fullMark: 100 },
    { subject: 'Phishing', A: 60, fullMark: 100 },
];

export function DigitalFootprint() {
    const { data: session } = useSession()
    const [score, setScore] = useState(45)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(initialData)

    useEffect(() => {
        if (session) {
            fetch("/api/scan/latest")
                .then(res => res.json())
                .then(d => {
                    if (d.score) {
                        setScore(d.score)
                        // Optional: Adjust chart data based on score roughly
                    }
                })
        }
    }, [session])

    const saveScan = async (s: number) => {
        if (!session) return
        try {
            await fetch("/api/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ score: s })
            })
            toast.success("Score mis à jour et sauvegardé")
        } catch { toast.error("Erreur de sauvegarde") }
    }

    const analyzeFootprint = () => {
        setLoading(true)
        // Simulate complex analysis
        setTimeout(() => {
            const newScore = Math.floor(Math.random() * (95 - 70) + 70)
            setScore(newScore)
            setData([
                { subject: 'Mots de passe', A: Math.floor(Math.random() * 30 + 70), fullMark: 100 },
                { subject: 'Anonymat', A: Math.floor(Math.random() * 40 + 60), fullMark: 100 },
                { subject: 'Fuites Données', A: Math.floor(Math.random() * 20 + 80), fullMark: 100 },
                { subject: 'Sécurité Web', A: Math.floor(Math.random() * 20 + 80), fullMark: 100 },
                { subject: 'Phishing', A: 90, fullMark: 100 },
            ])
            setLoading(false)
            if (session) {
                saveScan(newScore)
            } else {
                toast.info("Connectez-vous pour sauvegarder votre score")
            }
        }, 2000)
    }

    const getScoreColor = (s: number) => {
        if (s < 50) return "text-red-500"
        if (s < 80) return "text-yellow-500"
        return "text-green-500"
    }

    const getScoreLabel = (s: number) => {
        if (s < 50) return "Critique"
        if (s < 80) return "Moyen"
        return "Excellent"
    }

    return (
        <div className="grid gap-6 md:grid-cols-3 mb-10">
            {/* Main Score Card */}
            <Card className="md:col-span-1 bg-black/40 border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col justify-center items-center p-6 bg-gradient-to-b from-white/5 to-transparent">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 pointer-events-none" />

                <div className="relative z-10 text-center space-y-2">
                    <div className="flex flex-col items-center">
                        <h3 className="text-muted-foreground uppercase tracking-widest text-xs font-bold mb-1">Global Security Score</h3>
                        {!session && <span className="text-[10px] text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 mb-2">Mode Invité</span>}
                    </div>
                    <div className={`text-6xl font-black ${getScoreColor(score)} transition-colors duration-1000`}>
                        {score}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
                        {score < 50 ? <ShieldAlert className="h-3 w-3 text-red-500" /> : <ShieldCheck className="h-3 w-3 text-green-500" />}
                        {getScoreLabel(score)}
                    </div>
                </div>

                <div className="mt-8 w-full">
                    <Button
                        onClick={analyzeFootprint}
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                    >
                        {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Activity className="h-4 w-4 mr-2" />}
                        {loading ? "Analyse en cours..." : "Lancer un Audit Complet"}
                    </Button>
                </div>
            </Card>

            {/* Detailed Chart */}
            <Card className="md:col-span-2 bg-black/20 border-white/10 backdrop-blur-sm p-2 flex flex-col md:flex-row items-center">
                <div className="w-full h-[250px] flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Security"
                                dataKey="A"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fill="#8884d8"
                                fillOpacity={0.3}
                            />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/3 p-4 space-y-4 border-l border-white/5">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-400" />
                        Recommandations
                    </h4>
                    <div className="space-y-3">
                        {score < 80 && (
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-red-400">Mot de passe faible détecté</span>
                                    <span className="text-muted-foreground">-20 pts</span>
                                </div>
                                <Progress value={30} className="h-1 bg-white/5 [&>div]:bg-red-500" />
                            </div>
                        )}
                        {data.find(d => d.subject === 'Anonymat')?.A! < 50 && (
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-yellow-400">IP visible publiquement</span>
                                    <span className="text-muted-foreground">-15 pts</span>
                                </div>
                                <Progress value={45} className="h-1 bg-white/5 [&>div]:bg-yellow-500" />
                            </div>
                        )}
                        {score > 80 && (
                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-300">
                                Tout semble sécurisé. Continuez de vérifier vos comptes régulièrement.
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}
