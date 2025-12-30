import { getSecurityAlerts } from "@/lib/rss"
import { AlertTriangle } from "lucide-react"

export async function SecurityTicker() {
    const alerts = await getSecurityAlerts()

    if (alerts.length === 0) return null

    return (
        <div className="w-full bg-red-950/30 border-b border-red-500/20 overflow-hidden relative h-10 flex items-center">
            <div className="absolute left-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent" />

            <div className="flex whitespace-nowrap animate-ticker items-center">
                {/* Duplicate content for seamless loop */}
                {[...alerts, ...alerts].map((alert, i) => (
                    <a
                        key={i}
                        href={alert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center mx-8 text-sm font-medium text-red-200 hover:text-red-100 transition-colors group"
                    >
                        <AlertTriangle className="w-4 h-4 mr-2 text-red-500 group-hover:animate-pulse" />
                        <span className="mr-2 uppercase text-red-500/70 text-xs tracking-wider font-bold">CERT-FR:</span>
                        {alert.title}
                    </a>
                ))}
            </div>
        </div>
    )
}
