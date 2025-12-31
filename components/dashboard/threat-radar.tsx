import { Activity, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function ThreatRadar({ items }: { items: any[] }) {
    // Calcul de la moyenne des scores
    // Prevent division by zero if no items
    const avgScore = items.length > 0
        ? items.reduce((acc, curr) => acc + (curr.geminiScore || 0), 0) / items.length
        : 0;

    let status = "NORMAL";
    let color = "text-emerald-400";
    let pulse = "bg-emerald-500";
    let borderColor = "border-emerald-500/20";
    let icon = <ShieldCheck className="w-6 h-6 text-emerald-400" />;

    if (avgScore > 40) {
        status = "ELEVÉ";
        color = "text-orange-400";
        pulse = "bg-orange-500";
        borderColor = "border-orange-500/20";
        icon = <AlertTriangle className="w-6 h-6 text-orange-400" />;
    }
    if (avgScore > 70) {
        status = "CRITIQUE";
        color = "text-red-500";
        pulse = "bg-red-500";
        borderColor = "border-red-500/20";
        icon = <ShieldAlert className="w-6 h-6 text-red-500" />;
    }

    // If no items, assume initializing or safe
    if (items.length === 0) {
        status = "CALME";
    }

    return (
        <div className={`w-full mb-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 relative overflow-hidden group`}>
            {/* Dynamic Border Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 pointer-events-none`}></div>

            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 relative z-10">

                <div className="flex items-center gap-6">
                    <div className="relative flex h-4 w-4">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulse}`}></span>
                        <span className={`relative inline-flex rounded-full h-4 w-4 ${pulse} shadow-[0_0_15px_currentColor]`}></span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-gray-500" />
                            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Niveau de Menace Cyber Global</p>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <h2 className={`text-3xl font-black tracking-tighter ${color} drop-shadow-lg flex items-center gap-2`}>
                                {status}
                            </h2>
                            <span className="text-xl font-mono text-white/40">
                                {Math.round(avgScore)}<span className="text-sm">/100</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-right border-l border-white/5 pl-8">
                    <div>
                        <p className="text-xs text-gray-500 font-mono mb-1">Articles Analysés</p>
                        <p className="text-xl font-bold text-white">{items.length}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-mono mb-1">Dernière Mise à Jour</p>
                        <p className="text-sm text-blue-400 font-mono bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>

            </div>
            {/* Progress Bar Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                <div
                    className={`h-full ${pulse} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(avgScore, 100)}%`, opacity: 0.5 }}
                />
            </div>
        </div>
    );
}
