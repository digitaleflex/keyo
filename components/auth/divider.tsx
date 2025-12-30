"use client"

export function Divider() {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/40 px-2 text-muted-foreground backdrop-blur-xl">Ou continuer avec</span>
            </div>
        </div>
    )
}
