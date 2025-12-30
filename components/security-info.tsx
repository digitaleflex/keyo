import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"

export function SecurityInfo() {
  return (
    <div className="space-y-8">
      <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary" />
            Comment créer un mot de passe à la fois fort et sécurisé ?
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert prose-sm max-w-none text-muted-foreground">
          <p>
            De nos jours, la sécurité numérique est un élément primordial. Vu que la plupart des gens utilisent
            plusieurs plateformes pour communiquer, faire des échanges commerciaux ou encore stocker des documents,{" "}
            <strong className="text-white">il est nécessaire de sécuriser ces informations avec un mot de passe fiable.</strong>
          </p>
          <p>
            En utilisant un gestionnaire ainsi qu'un générateur mot de passe fort et sécurisé, vous allez pouvoir
            obtenir un mot de passe difficile à pirater.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            L'importance d'avoir un mot de passe fort
          </h3>
          <p>
            Pour rappel, un mot de passe est un moyen d'authentification inévitable sur des sites web ou applications
            mobiles. Un mot de passe faible est un code facile à décrypter tandis qu'un mot de passe fort exploite un
            système de chiffrement difficile à cracker.
          </p>
          <p>Voici des exemples de mots de passe sécurisés et forts sur lesquels vous pouvez vous inspirer :</p>
          <ul className="grid sm:grid-cols-2 gap-2 not-prose mt-4 mb-6">
            {["M0t-d3-pAssE!", "Ifbaj2320", "D&A&Ch3§", "20T$ùesLàP020"].map((pwd, i) => (
              <li key={i} className="bg-black/20 border border-white/5 rounded-lg p-3 font-mono text-center text-primary-foreground">
                {pwd}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Quels sont les éléments à considérer ?</h3>
          <p>Dans un mot de passe fort et sécurisé, vous devez prendre en compte les éléments suivants :</p>
          <ul className="space-y-2 mt-4">
            <li className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Les combinaisons de plusieurs caractères</strong> - Mélangez lettres majuscules, minuscules, chiffres et symboles.</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span><strong>La longueur du mot de passe</strong> - Au minimum 12 caractères est recommandé aujourd'hui.</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span><strong>La diversification</strong> - Un mot de passe UNIQUE pour chaque compte.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Solutions recommandées</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert prose-sm max-w-none text-muted-foreground">
            <h4 className="text-lg font-medium text-primary">Générateurs et Gestionnaires</h4>
            <p>
              Les outils comme <strong>Keyo</strong> génèrent de l'aléatoire pur impossible à deviner humainement.
              Couplez-le à un gestionnaire de mots de passe (comme Bitwarden ou 1Password) pour ne retenir qu'un seul mot de passe maître.
            </p>

            <h4 className="text-lg font-medium text-primary mt-4">Astuces mnémoniques</h4>
            <p>
              Prenez une phrase : « le soleil brille pendant le jour » → <code>LsBpLj</code>. Ajoutez-y des chiffres et symboles.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              À éviter absolument
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert prose-sm max-w-none text-muted-foreground">
            <ul className="space-y-2">
              <li className="text-red-200/80">✗ Réutiliser le même mot de passe partout</li>
              <li className="text-red-200/80">✗ Utiliser "123456", "password", ou votre date de naissance</li>
              <li className="text-red-200/80">✗ Stocker vos mots de passe dans un fichier texte sur le bureau</li>
              <li className="text-red-200/80">✗ Mots de passe courts (moins de 8 caractères)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Conseil d'expert : L'Authentification à Double Facteur (2FA)</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p className="max-w-2xl mx-auto">
            Même le meilleur mot de passe peut être volé. Activez toujours la <strong>2FA (Google Authenticator, YubiKey, SMS)</strong>.
            C'est la seule barrière qui reste si votre mot de passe est compromis.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
