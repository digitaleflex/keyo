"use client"

import { Button } from "@/components/ui/button"
import { Github, Chrome } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export function SocialButtons() {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
                variant="outline"
                className="bg-zinc-900/50 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-11"
                onClick={async () => {
                    await signIn.social({
                        provider: "github",
                        callbackURL: "/tools"
                    })
                }}
            >
                <Github className="mr-2 h-4 w-4" />
                GitHub
            </Button>
            <Button
                type="button"
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-11 text-white hover:text-white"
                onClick={async () => {
                    await signIn.social({
                        provider: "google",
                        callbackURL: "/tools"
                    })
                }}
            >
                <Chrome className="mr-2 h-4 w-4" />
                Google
            </Button>
        </div>
    )
}
