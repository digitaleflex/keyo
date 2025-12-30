"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Copy, RefreshCw, ShieldCheck, KeyRound } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SPECIAL_CHARS = [
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  ",",
  ".",
  "/",
  "?",
]
const SIMILAR_CHARS = ["o", "O", "0", "1", "l", "I"]

export function PasswordGenerator() {
  const [passwords, setPasswords] = useState<string[]>([])
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [selectedSpecialChars, setSelectedSpecialChars] = useState<string[]>(SPECIAL_CHARS)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [passwordLength, setPasswordLength] = useState(12)
  const [passwordCount, setPasswordCount] = useState(5)
  const { toast } = useToast()

  useEffect(() => {
    generatePasswords()
  }, [
    includeNumbers,
    includeLowercase,
    includeUppercase,
    selectedSpecialChars,
    excludeSimilar,
    passwordLength,
    passwordCount,
  ])

  const generatePassword = () => {
    let charset = ""

    if (includeNumbers) charset += "0123456789"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (selectedSpecialChars.length > 0) charset += selectedSpecialChars.join("")

    if (excludeSimilar) {
      charset = charset
        .split("")
        .filter((char) => !SIMILAR_CHARS.includes(char))
        .join("")
    }

    if (charset === "") return ""

    let password = ""
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return password
  }

  const generatePasswords = () => {
    const newPasswords = Array.from({ length: passwordCount }, () => generatePassword())
    setPasswords(newPasswords)
  }

  const copyToClipboard = (password: string) => {
    navigator.clipboard.writeText(password)
    toast({
      title: "Copié!",
      description: "Le mot de passe a été copié dans le presse-papiers.",
    })
  }

  const toggleSpecialChar = (char: string) => {
    setSelectedSpecialChars((prev) => (prev.includes(char) ? prev.filter((c) => c !== char) : [...prev, char]))
  }

  const selectAllSpecialChars = () => {
    setSelectedSpecialChars(SPECIAL_CHARS)
  }

  const deselectAllSpecialChars = () => {
    setSelectedSpecialChars([])
  }

  return (
    <Card className="mb-12 border-0 bg-white/5 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
      <CardHeader className="pb-8 text-center border-b border-white/5">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 ring-1 ring-white/10 shadow-inner">
          <KeyRound className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Créer un mot de passe robuste
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 p-6 md:p-8">
        {/* Main Controls Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left Column: Settings */}
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
                {SPECIAL_CHARS.map((char) => (
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

          {/* Right Column: Output */}
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
              {passwords.map((password, index) => (
                <div
                  key={index}
                  className="group relative flex items-center p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 rounded-xl transition-all duration-300"
                >
                  <span className="flex-1 font-mono text-lg break-all text-white/90 group-hover:text-white tracking-wide">
                    {password}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(password)}
                    className="shrink-0 ml-2 opacity-50 group-hover:opacity-100 transition-opacity hover:bg-primary/20 hover:text-primary rounded-lg h-10 w-10"
                  >
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/5 mt-auto">
              <Button
                size="lg"
                onClick={generatePasswords}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold h-14 rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <RefreshCw className="w-5 h-5 mr-3 animate-[spin_3s_linear_infinite_paused] hover:animate-[spin_1s_linear_infinite]" />
                Générer de nouveaux mots de passe
              </Button>
            </div>
          </div>
        </div>

        {/* USB Key Ad */}
        <div className="pt-6 border-t border-white/5 flex justify-center">
          <a
            href="https://www.amazon.fr/iStorage-datAshur-Personal2-chiffr%C3%A9e-FL-DAP3-B-8/dp/B01N1Q24UT"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-full border border-transparent hover:border-primary/20 hover:bg-primary/5"
          >
            <span>🔒</span>
            <span>Sécurisez vos données physiques avec une clé USB chiffrée</span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded ml-1 group-hover:bg-primary group-hover:text-white transition-colors">Recommandé</span>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
