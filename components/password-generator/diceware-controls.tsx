import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Dice5 } from "lucide-react"

interface DicewareControlsProps {
    passphraseLength: number
    setPassphraseLength: (v: number) => void
    passphraseSeparator: string
    setPassphraseSeparator: (v: string) => void
    capitalize: boolean
    setCapitalize: (v: boolean) => void
}

export function DicewareControls({
    passphraseLength,
    setPassphraseLength,
    passphraseSeparator,
    setPassphraseSeparator,
    capitalize,
    setCapitalize
}: DicewareControlsProps) {
    return (
        <div className="mt-0 space-y-6">
            <div className="space-y-4 rounded-xl bg-black/20 p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <Dice5 className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                        Configuration Diceware
                    </h3>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <Label>Nombre de mots</Label>
                        <span className="text-2xl font-bold text-primary font-mono bg-primary/10 px-3 py-1 rounded-md">
                            {passphraseLength}
                        </span>
                    </div>
                    <Slider
                        value={[passphraseLength]}
                        onValueChange={(value) => setPassphraseLength(value[0])}
                        min={3}
                        max={10}
                        step={1}
                        className="w-full"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                        5 mots = Très difficile à pirater (recommandé)
                    </p>
                </div>
            </div>

            <div className="space-y-4 rounded-xl bg-black/20 p-6 border border-white/5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 font-mono">
                    Séparateur
                </h3>
                <div className="flex gap-2 justify-center">
                    {["-", ".", "_", " "].map((sep) => (
                        <Button
                            key={sep === " " ? "space" : sep}
                            variant={passphraseSeparator === sep ? "default" : "outline"}
                            onClick={() => setPassphraseSeparator(sep)}
                            className={`w-12 h-12 text-lg font-mono ${passphraseSeparator === sep ? "bg-primary text-primary-foreground" : "bg-transparent border-white/10 hover:bg-white/5"}`}
                        >
                            {sep === " " ? "␣" : sep}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-3 p-6 rounded-xl bg-black/20 border border-white/5">
                <Checkbox
                    id="capitalize"
                    checked={capitalize}
                    onCheckedChange={(checked) => setCapitalize(checked as boolean)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex flex-col">
                    <Label htmlFor="capitalize" className="cursor-pointer font-medium">
                        Majuscule au début de chaque mot
                    </Label>
                    <span className="text-xs text-muted-foreground">Augmente la complexité (Recommandé)</span>
                </div>
            </div>
        </div>
    )
}
