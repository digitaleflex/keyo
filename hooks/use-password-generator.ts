import { useState, useEffect } from "react"
import { dicewareWords } from "@/lib/diceware-list"
import zxcvbn from "zxcvbn"
import { useToast } from "@/hooks/use-toast"

const SPECIAL_CHARS = [
    "~", "!", "@", "#", "$", "%", "^", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", ",", ".", "/", "?",
]
const SIMILAR_CHARS = ["o", "O", "0", "1", "l", "I"]

export function usePasswordGenerator() {
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
            // Use crypto.getRandomValues for better randomness if available, else fallback
            const randomBuffer = new Uint32Array(1);
            window.crypto.getRandomValues(randomBuffer);
            const randomIndex = randomBuffer[0] % charset.length;
            password += charset.charAt(randomIndex);
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
        let crackTime: string | number = result.crack_times_display.offline_slow_hashing_1e4_per_second

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

    return {
        passwords,
        state: {
            includeNumbers, setIncludeNumbers,
            includeLowercase, setIncludeLowercase,
            includeUppercase, setIncludeUppercase,
            selectedSpecialChars, setSelectedSpecialChars,
            excludeSimilar, setExcludeSimilar,
            passwordLength, setPasswordLength,
            passwordCount, setPasswordCount,
            passphraseLength, setPassphraseLength,
            passphraseSeparator, setPassphraseSeparator,
            capitalize, setCapitalize,
            activeTab, setActiveTab
        },
        actions: {
            generate,
            getStrengthAndColor,
            copyToClipboard,
            toggleSpecialChar,
            selectAllSpecialChars,
            deselectAllSpecialChars
        },
        constants: {
            SPECIAL_CHARS
        }
    }
}
