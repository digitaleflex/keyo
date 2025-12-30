"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KeyRound, Dice5 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dicewareWords } from "@/lib/diceware-list"
import zxcvbn from "zxcvbn"
import { ClassicControls } from "./password-generator/classic-controls"
import { DicewareControls } from "./password-generator/diceware-controls"
import { PasswordDisplay } from "./password-generator/password-display"

const SPECIAL_CHARS = [
  "~", "!", "@", "#", "$", "%", "^", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", ",", ".", "/", "?",
]
const SIMILAR_CHARS = ["o", "O", "0", "1", "l", "I"]

export function PasswordGenerator() {
  const [passwords, setPasswords] = useState<string[]>([])

  // Standard Generator State
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [selectedSpecialChars, setSelectedSpecialChars] = useState<string[]>(SPECIAL_CHARS)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [passwordLength, setPasswordLength] = useState(12)
  const [passwordCount, setPasswordCount] = useState(5)

  // Diceware Generator State
  const [passphraseLength, setPassphraseLength] = useState(4)
  const [passphraseSeparator, setPassphraseSeparator] = useState("-")
  const [capitalize, setCapitalize] = useState(true)

  const [activeTab, setActiveTab] = useState("classic")
  const { toast } = useToast()

  useEffect(() => {
    generate()
  }, [
    includeNumbers,
    includeLowercase,
    includeUppercase,
    selectedSpecialChars,
    excludeSimilar,
    passwordLength,
    passwordCount,
    passphraseLength,
    passphraseSeparator,
    capitalize,
    activeTab
  ])

  const generate = () => {
    if (activeTab === "classic") generatePasswords()
    else generatePassphrases()
  }

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

  const generatePassphrases = () => {
    const newPassphrases = Array.from({ length: passwordCount }, () => {
      let phrase = []
      for (let i = 0; i < passphraseLength; i++) {
        let word = dicewareWords[Math.floor(Math.random() * dicewareWords.length)]
        if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1)
        phrase.push(word)
      }
      return phrase.join(passphraseSeparator)
    })
    setPasswords(newPassphrases)
  }

  const generatePasswords = () => {
    const newPasswords = Array.from({ length: passwordCount }, () => generatePassword())
    setPasswords(newPasswords)
  }

  const getStrengthAndColor = (password: string) => {
    const result = zxcvbn(password)
    const score = result.score
    let color = "bg-red-500"
    let label = "Faible"
    let crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second

    if (score === 2) { color = "bg-yellow-500"; label = "Moyen" }
    if (score === 3) { color = "bg-blue-500"; label = "Fort" }
    if (score === 4) { color = "bg-green-500"; label = "Incassable" }

    return { score, color, label, crackTime }
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/20">
            <TabsTrigger value="classic" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <KeyRound className="w-4 h-4 mr-2" />
              Aléatoire Classique
            </TabsTrigger>
            <TabsTrigger value="diceware" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Dice5 className="w-4 h-4 mr-2" />
              Passphrase (Diceware)
            </TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Settings */}
            <div className="space-y-6">
              <TabsContent value="classic" className="mt-0">
                <ClassicControls
                  includeNumbers={includeNumbers}
                  setIncludeNumbers={setIncludeNumbers}
                  includeLowercase={includeLowercase}
                  setIncludeLowercase={setIncludeLowercase}
                  includeUppercase={includeUppercase}
                  setIncludeUppercase={setIncludeUppercase}
                  excludeSimilar={excludeSimilar}
                  setExcludeSimilar={setExcludeSimilar}
                  passwordLength={passwordLength}
                  setPasswordLength={setPasswordLength}
                  specialChars={SPECIAL_CHARS}
                  selectedSpecialChars={selectedSpecialChars}
                  toggleSpecialChar={toggleSpecialChar}
                  selectAllSpecialChars={selectAllSpecialChars}
                  deselectAllSpecialChars={deselectAllSpecialChars}
                />
              </TabsContent>

              <TabsContent value="diceware" className="mt-0">
                <DicewareControls
                  passphraseLength={passphraseLength}
                  setPassphraseLength={setPassphraseLength}
                  passphraseSeparator={passphraseSeparator}
                  setPassphraseSeparator={setPassphraseSeparator}
                  capitalize={capitalize}
                  setCapitalize={setCapitalize}
                />
              </TabsContent>
            </div>

            {/* Right Column: Output */}
            <PasswordDisplay
              passwords={passwords}
              passwordCount={passwordCount}
              setPasswordCount={setPasswordCount}
              copyToClipboard={copyToClipboard}
              generate={generate}
              getStrength={getStrengthAndColor}
            />
          </div>
        </Tabs>

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
