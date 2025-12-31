"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KeyRound, Dice5, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassicControls } from "./password-generator/classic-controls"
import { DicewareControls } from "./password-generator/diceware-controls"
import { PasswordDisplay } from "./password-generator/password-display"
import { usePasswordGenerator } from "@/hooks/use-password-generator"

export function PasswordGenerator() {
  const { passwords, state, actions, constants } = usePasswordGenerator()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
        {mounted ? (
          <Tabs value={state.activeTab} onValueChange={state.setActiveTab} className="w-full">
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
                    includeNumbers={state.includeNumbers}
                    setIncludeNumbers={state.setIncludeNumbers}
                    includeLowercase={state.includeLowercase}
                    setIncludeLowercase={state.setIncludeLowercase}
                    includeUppercase={state.includeUppercase}
                    setIncludeUppercase={state.setIncludeUppercase}
                    excludeSimilar={state.excludeSimilar}
                    setExcludeSimilar={state.setExcludeSimilar}
                    passwordLength={state.passwordLength}
                    setPasswordLength={state.setPasswordLength}
                    specialChars={constants.SPECIAL_CHARS}
                    selectedSpecialChars={state.selectedSpecialChars}
                    toggleSpecialChar={actions.toggleSpecialChar}
                    selectAllSpecialChars={actions.selectAllSpecialChars}
                    deselectAllSpecialChars={actions.deselectAllSpecialChars}
                  />
                </TabsContent>

                <TabsContent value="diceware" className="mt-0">
                  <DicewareControls
                    passphraseLength={state.passphraseLength}
                    setPassphraseLength={state.setPassphraseLength}
                    passphraseSeparator={state.passphraseSeparator}
                    setPassphraseSeparator={state.setPassphraseSeparator}
                    capitalize={state.capitalize}
                    setCapitalize={state.setCapitalize}
                  />
                </TabsContent>
              </div>

              {/* Right Column: Output */}
              <PasswordDisplay
                passwords={passwords}
                passwordCount={state.passwordCount}
                setPasswordCount={state.setPasswordCount}
                copyToClipboard={actions.copyToClipboard}
                generate={actions.generate}
                getStrength={actions.getStrengthAndColor}
              />
            </div>
          </Tabs>
        ) : (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}


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
