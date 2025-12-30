import { KeyoLogo } from "@/components/keyo-logo"

export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-background/40 backdrop-blur-lg">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <KeyoLogo className="h-6 w-6 text-muted-foreground" />
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="https://github.com/digitaleflex"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            DigitaleFlex
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="https://github.com/digitaleflex/keyo"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground transition-colors">Politique de confidentialité</a>
                    <a href="#" className="hover:text-foreground transition-colors">CGU</a>
                </div>
            </div>
        </footer>
    )
}
