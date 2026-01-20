'use client';

import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { useLocalRecommendations } from "@/hooks/use-local-recommendations";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DocumentRecommendation } from "@/lib/services/local-recommendation-service";

const CATEGORIES = [
    { id: 'all', label: 'All', query: null },
    { id: 'tech', label: 'Technology', query: 'technology ai software' },
    { id: 'science', label: 'Science', query: 'science research space' },
    { id: 'design', label: 'Design', query: 'design ux ui art' },
    { id: 'web', label: 'Web', query: 'web development internet code' },
];

interface RecommendedForYouProps {
    initialData?: DocumentRecommendation[];
}

export default function RecommendedForYou({ initialData }: RecommendedForYouProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const activeQuery = CATEGORIES.find(c => c.id === activeCategory)?.query;

    const { recommendations, loading, error } = useLocalRecommendations({
        // If query is present, use 'related', otherwise use 'trending' for 'all'
        type: activeQuery ? 'related' : 'trending',
        query: activeQuery || undefined,
        limit: 5,
        initialData: activeCategory === 'all' ? initialData : undefined,
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

    return (
        <section className="py-24 px-6 z-10 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3 text-crisp text-white font-display">
                        <Sparkles className="text-blue-400 w-8 h-8" />
                        Recommended for You
                    </h2>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                                    activeCategory === cat.id
                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <Link href="/search?q=trending" className="hidden md:flex px-6 py-2 rounded-full glass-panel text-sm font-semibold hover:bg-white/10 items-center gap-2 transition-all text-white border-white/10">
                        Explore all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
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
                ) : !recommendations || recommendations.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-white/50">No recommendations found for this category.</p>
                        <button
                            onClick={() => setActiveCategory('all')}
                            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-semibold"
                        >
                            View all recommendations
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {recommendations.map((item, i) => {
                            const color = colors[i % colors.length];
                            // Try to deduce context category or fallback to URL part
                            const displayCategory = activeCategory !== 'all'
                                ? CATEGORIES.find(c => c.id === activeCategory)?.label
                                : getCategory(item.url);

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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <span className="text-xs font-mono text-white/70 flex items-center gap-2">
                                                <ExternalLink className="w-3 h-3" />
                                                <span className="truncate max-w-[120px]">{new URL(item.url).hostname}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-${color}-500/20 text-${color}-300 border border-${color}-500/30 rounded`}>
                                                {displayCategory}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold mb-2 text-crisp group-hover:text-blue-300 transition-colors text-white line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/50 text-[11px] leading-relaxed line-clamp-3">
                                            {item.meta_description || "No description available for this document."}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

