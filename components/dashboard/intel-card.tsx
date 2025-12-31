import { AlertTriangle, ShieldAlert, Info, Briefcase, ExternalLink, Calendar, Zap } from 'lucide-react';

export interface IntelItem {
    id: string;
    title: string;
    source: string;
    summary: string;
    geminiScore: number;   // 0 à 100
    category: string;
    publishedAt: Date;
    url: string;
}

const getIcon = (tag: string) => {
    const normalizedTag = tag.toUpperCase();
    if (normalizedTag.includes('CRITIQUE') || normalizedTag.includes('URGENT')) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (normalizedTag.includes('VULNÉRABILITÉ')) return <ShieldAlert className="w-4 h-4 text-orange-400" />;
    if (normalizedTag.includes('BUSINESS') || normalizedTag.includes('FINANCE')) return <Briefcase className="w-4 h-4 text-blue-400" />;
    return <Info className="w-4 h-4 text-gray-400" />;
};

const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
    if (score >= 50) return 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]';
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
};

export default function IntelCard({ item }: { item: IntelItem }) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-black/60 hover:shadow-2xl hover:-translate-y-1">

            {/* Glow Effect au survol */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl pointer-events-none"></div>

            <div className="relative p-5 space-y-4 h-full flex flex-col">
                {/* Header : Source & Score */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gray-400 bg-white/5 rounded border border-white/5">
                            {item.source}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.publishedAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-bold font-mono ${getScoreColor(item.geminiScore)}`}>
                        <Zap className="w-3 h-3" />
                        <span>SCORE {item.geminiScore}</span>
                    </div>
                </div>

                {/* Contenu Principal */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-100 leading-tight mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-3 line-clamp-3 group-hover:border-blue-500/50 transition-colors">
                        {item.summary}
                    </p>
                </div>

                {/* Footer : Tag & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-300">
                        {getIcon(item.category)}
                        <span className="opacity-70">{item.category}</span>
                    </div>
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                        Source Originale
                        <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
