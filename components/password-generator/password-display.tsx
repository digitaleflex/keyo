import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Copy, RefreshCw, ShieldCheck } from "lucide-react"

interface PasswordScore {
    score: number
    color: string
    label: string
    crackTime: string | number
}

interface PasswordDisplayProps {
    passwords: string[]
    passwordCount: number
    setPasswordCount: (v: number) => void
    copyToClipboard: (password: string) => void
    generate: () => void
    getStrength: (password: string) => PasswordScore
}

export function PasswordDisplay({
    passwords,
    passwordCount,
    setPasswordCount,
    copyToClipboard,
    generate,
    getStrength
}: PasswordDisplayProps) {
    return (
        <div className="flex flex-col h-full rounded-xl bg-black/40 p-1 border border-white/10 shadow-inner">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5 rounded-t-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    Résultats
                </h3>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">Quantité</span>
                        <span className="text-sm font-bold text-primary">{passwordCount}</span>
                    </div>
                    <Slider
                        value={[passwordCount]}
                        onValueChange={(value) => setPasswordCount(value[0])}
                        min={1}
                        max={10}
                        step={1}
                        className="w-24"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {passwords.map((password, index) => {
                    const strength = getStrength(password)
                    return (
                        <div
                            key={index}
                            className="group flex flex-col p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 rounded-xl transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="flex-1 font-mono text-lg break-all text-white/90 group-hover:text-white tracking-wide mr-2">
                                    {password}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(password)}
                                    className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity hover:bg-primary/20 hover:text-primary rounded-lg h-10 w-10"
                                >
                                    <Copy className="w-5 h-5" />
                                </Button>
                            </div>
                            {/* Strength Indicator */}
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
                                    <div className={`h-full ${strength.color} transition-all duration-500`} style={{ width: `${(strength.score + 1) * 20}%` }} />
                                </div>
                                <span className={`text-[10px] uppercase font-bold ${strength.color.replace('bg-', 'text-')}`}>
                                    {strength.label}
                                </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1">
                                Temps de crackage : {strength.crackTime}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="p-4 border-t border-white/5 mt-auto">
                <Button
                    size="lg"
                    onClick={generate}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold h-14 rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02]"
                >
                    <RefreshCw className="w-5 h-5 mr-3 animate-[spin_3s_linear_infinite_paused] hover:animate-[spin_1s_linear_infinite]" />
                    Générer de nouveaux mots de passe
                </Button>
            </div>
        </div>
    )
}
