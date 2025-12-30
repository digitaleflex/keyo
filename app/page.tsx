import { PasswordGenerator } from "@/components/password-generator"
import { BlogCards } from "@/components/blog-cards"
import { SecurityInfo } from "@/components/security-info"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-block p-2 px-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium text-primary-foreground/80 mb-4">
            Sécurité Avancée
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight leading-tight mb-4">
            Keyo
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Générateur De MOT DE PASSE En Ligne
          </p>
        </header>

        {/* Password Generator */}
        <PasswordGenerator />

        {/* Blog Cards */}
        <div className="mt-24">
          <BlogCards />
        </div>

        {/* Security Information */}
        <div className="mt-24">
          <SecurityInfo />
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-muted-foreground pb-8 border-t border-white/10 pt-8">
          <p>© {new Date().getFullYear()} Keyo. Sécurité et confidentialité garanties.</p>
        </footer>
      </div>
    </main>
  )
}
