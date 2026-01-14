'use client';

import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { useLocalRecommendations } from "@/hooks/use-local-recommendations";
import Link from "next/link";

export default function RecommendedForYou() {
    const { recommendations, loading, error } = useLocalRecommendations({
        type: 'trending', // Use trending for landing page
        limit: 3,
    });

    const getCategory = (url: string) => {
        try {
            const hostname = new URL(url).hostname;
            return hostname.replace('www.', '').split('.')[0];
        } catch {
            return "Web";
        }
    };

    const colors = ["blue", "emerald", "purple", "amber", "rose", "cyan"];

    if (loading) {
        return (
            <section className="py-24 px-6 z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold flex items-center gap-3 text-crisp text-white font-display">
                            <Sparkles className="text-blue-400 w-8 h-8" />
                            Recommended for You
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass-panel rounded-2xl overflow-hidden h-96 animate-pulse border-white/10">
                                <div className="h-48 bg-white/5" />
                                <div className="p-8 space-y-4">
                                    <div className="h-4 bg-white/10 rounded w-1/3" />
                                    <div className="h-6 bg-white/10 rounded w-3/4" />
                                    <div className="h-4 bg-white/10 rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!recommendations || recommendations.length === 0) {
        return null;
    }

    return (
        <section className="py-24 px-6 z-10 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold flex items-center gap-3 text-crisp text-white font-display">
                        <Sparkles className="text-blue-400 w-8 h-8" />
                        Recommended for You
                    </h2>
                    <Link href="/search?q=trending" className="px-6 py-2 rounded-full glass-panel text-sm font-semibold hover:bg-white/10 flex items-center gap-2 transition-all text-white border-white/10">
                        Explore all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.map((item, i) => {
                        const color = colors[i % colors.length];
                        return (
                            <Link
                                key={item.doc_id}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group card-hover-immersive glass-panel rounded-2xl overflow-hidden flex flex-col cursor-pointer border-white/10 h-full"
                            >
                                <div className={`aspect-video relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}>
                                    <div className={`absolute inset-0 bg-${color}-500/10 opacity-50`} />
                                    <Sparkles className={`w-12 h-12 text-${color}-400/50`} />
                                    { /* Placeholder for actual image if we had one */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <span className="text-xs font-mono text-white/70 flex items-center gap-2">
                                            <ExternalLink className="w-3 h-3" />
                                            {new URL(item.url).hostname}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-${color}-500/20 text-${color}-300 border border-${color}-500/30 rounded`}>
                                            {getCategory(item.url)}
                                        </span>
                                        {item.created_at && (
                                            <span className="text-xs text-white/40">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-crisp group-hover:text-blue-300 transition-colors text-white line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                                        {item.meta_description || "No description available for this document."}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

