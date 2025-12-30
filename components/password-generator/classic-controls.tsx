import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface ClassicControlsProps {
    includeNumbers: boolean
    setIncludeNumbers: (v: boolean) => void
    includeLowercase: boolean
    setIncludeLowercase: (v: boolean) => void
    includeUppercase: boolean
    setIncludeUppercase: (v: boolean) => void
    excludeSimilar: boolean
    setExcludeSimilar: (v: boolean) => void
    passwordLength: number
    setPasswordLength: (v: number) => void
    specialChars: string[]
    selectedSpecialChars: string[]
    toggleSpecialChar: (char: string) => void
    selectAllSpecialChars: () => void
    deselectAllSpecialChars: () => void
}

export function ClassicControls({
    includeNumbers,
    setIncludeNumbers,
    includeLowercase,
    setIncludeLowercase,
    includeUppercase,
    setIncludeUppercase,
    excludeSimilar,
    setExcludeSimilar,
    passwordLength,
    setPasswordLength,
    specialChars,
    selectedSpecialChars,
    toggleSpecialChar,
    selectAllSpecialChars,
    deselectAllSpecialChars
}: ClassicControlsProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4 rounded-xl bg-black/20 p-6 border border-white/5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 font-mono">
                    01. Composition
                </h3>

                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Checkbox
                        id="numbers"
                        checked={includeNumbers}
                        onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="numbers" className="cursor-pointer flex-1 font-medium">
                        Chiffres <span className="text-muted-foreground ml-2 font-mono text-xs opacity-70">[0-9]</span>
                    </Label>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Checkbox
                        id="lowercase"
                        checked={includeLowercase}
                        onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="lowercase" className="cursor-pointer flex-1 font-medium">
                        Minuscules <span className="text-muted-foreground ml-2 font-mono text-xs opacity-70">[a-z]</span>
                    </Label>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Checkbox
                        id="uppercase"
                        checked={includeUppercase}
                        onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="uppercase" className="cursor-pointer flex-1 font-medium">
                        Majuscules <span className="text-muted-foreground ml-2 font-mono text-xs opacity-70">[A-Z]</span>
                    </Label>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Checkbox
                        id="exclude-similar"
                        checked={excludeSimilar}
                        onCheckedChange={(checked) => setExcludeSimilar(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="exclude-similar" className="cursor-pointer flex-1 font-medium">
                        Exclure similaires <span className="text-muted-foreground ml-2 font-mono text-xs opacity-70">[I, l, 1, O, 0]</span>
                    </Label>
                </div>
            </div>

            <div className="space-y-4 rounded-xl bg-black/20 p-6 border border-white/5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 font-mono">
                    02. Longueur
                </h3>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <Label>Caractères</Label>
                        <span className="text-2xl font-bold text-primary font-mono bg-primary/10 px-3 py-1 rounded-md min-w-[3ch] text-center">
                            {passwordLength}
                        </span>
                    </div>
                    <Slider
                        value={[passwordLength]}
                        onValueChange={(value) => setPasswordLength(value[0])}
                        min={8}
                        max={64}
                        step={1}
                        className="w-full"
                    />
                    <div className="flex gap-2 flex-wrap justify-center">
                        {[8, 12, 16, 24, 32].map((length) => (
                            <Button
                                key={length}
                                variant={passwordLength === length ? "default" : "outline"}
                                size="sm"
                                onClick={() => setPasswordLength(length)}
                                className={`h-7 px-3 text-xs ${passwordLength === length ? "bg-primary text-primary-foreground" : "bg-transparent border-white/10 hover:bg-white/5"}`}
                            >
                                {length}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4 rounded-xl bg-black/20 p-6 border border-white/5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 font-mono">
                    03. Caractères Spéciaux
                </h3>

                <div className="flex flex-wrap gap-1.5 justify-center">
                    {specialChars.map((char) => (
                        <button
                            key={char}
                            onClick={() => toggleSpecialChar(char)}
                            className={`w-8 h-8 rounded-md flex items-center justify-center text-sm transition-all duration-200 ${selectedSpecialChars.includes(char)
                                ? "bg-accent text-white shadow-lg shadow-accent/25 scale-110 font-bold"
                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                }`}
                        >
                            {char}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 justify-center mt-2">
                    <Button variant="ghost" size="sm" onClick={deselectAllSpecialChars} className="text-xs h-8 text-muted-foreground hover:text-white">
                        Aucun
                    </Button>
                    <Button variant="ghost" size="sm" onClick={selectAllSpecialChars} className="text-xs h-8 text-primary hover:text-primary/80 hover:bg-primary/10">
                        Tous
                    </Button>
                </div>
            </div>
        </div>
    )
}
