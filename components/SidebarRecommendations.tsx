'use client';

import { useLocalRecommendations } from '@/hooks/use-local-recommendations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface SidebarRecommendationsProps {
    immersive?: boolean;
}

const CATEGORIES = [
    { id: 'all', label: 'All', query: null },
    { id: 'tech', label: 'Tech', query: 'technology ai software' },
    { id: 'science', label: 'Sci', query: 'science research space' }, // Shortened for sidebar
    { id: 'design', label: 'Design', query: 'design ux ui art' },
    { id: 'web', label: 'Web', query: 'web development internet code' },
];

export function SidebarRecommendations({ immersive }: SidebarRecommendationsProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    const activeQuery = CATEGORIES.find(c => c.id === activeCategory)?.query;

    const { recommendations, loading, error } = useLocalRecommendations({
        type: activeQuery ? 'related' : 'popular', // Use 'popular' for 'all' in sidebar for variety
        query: activeQuery || undefined,
        limit: 5,
    });

    const CategoryTabs = () => (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 mask-fade-sides">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all",
                        activeCategory === cat.id
                            ? (immersive ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-blue-600 text-white")
                            : (immersive ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white" : "bg-blue-100/50 text-blue-600 hover:bg-blue-100")
                    )}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );

    if (loading) {
        return (
            <Card className={immersive ? "glass-panel border-white/10 rounded-3xl" : ""}>
                <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 ${immersive ? "text-slate-400 font-bold uppercase tracking-widest" : ""}`}>
                        <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                        Recommended
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2 mb-4 overflow-hidden">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-6 w-12 bg-white/5 rounded-full animate-pulse" />)}
                    </div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-1">
                            <div className={`h-3 w-2/3 ${immersive ? "bg-slate-800" : "bg-muted"} animate-pulse rounded`} />
                            <div className={`h-2 w-full ${immersive ? "bg-slate-800" : "bg-muted"} animate-pulse rounded`} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (error && recommendations.length === 0) {
        return null;
    }

    if (immersive) {
        return (
            <Card className="glass-panel border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <CardHeader className="pb-4 border-b border-white/10 mb-2">
                    <CardTitle className="text-sm flex items-center gap-2 font-bold uppercase tracking-widest text-slate-400">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        Nexus Intelligence
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                    <div className="px-4">
                        <CategoryTabs />
                    </div>

                    {recommendations.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {recommendations.map((rec) => (
                                <Link
                                    key={rec.doc_id}
                                    href={rec.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 hover:bg-white/5 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-foreground truncate max-w-[180px]">{rec.title || rec.url}</span>
                                        {rec.score > 0 && (
                                            <Badge variant="outline" className="text-[10px] py-0 h-4 bg-blue-500/10 border-blue-500/30 text-blue-400 font-bold">
                                                {(rec.score * 100).toFixed(0)}%
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1 mt-1 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full group-hover:scale-x-105 origin-left transition-transform"
                                            style={{ width: `${Math.min(rec.score * 100, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 font-medium line-clamp-2">
                                        {rec.meta_description || "No description available."}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-slate-500 text-xs">
                            No recommendations found for this category.
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2 border-b border-blue-100/50 mb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-blue-900">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    Recommended by Nexus
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-3">
                <div className="px-3">
                    <CategoryTabs />
                </div>

                {recommendations.length > 0 ? (
                    <div className="divide-y divide-blue-100/50">
                        {recommendations.map((rec) => (
                            <Link
                                key={rec.doc_id}
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 hover:bg-blue-100/30 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-blue-800 truncate max-w-[200px]">{rec.title || rec.url}</span>
                                    <Badge variant="outline" className="text-[10px] py-0 h-4 bg-white border-blue-200 text-blue-700">
                                        {rec.score.toFixed(2)}
                                    </Badge>
                                </div>
                                <div className="w-full bg-blue-100 rounded-full h-1 mt-1">
                                    <div
                                        className="bg-blue-500 h-1 rounded-full"
                                        style={{ width: `${Math.min(rec.score * 100, 100)}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-blue-600/70 mt-1 line-clamp-1">
                                    {rec.meta_description || "Discover more content like this."}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-blue-400/70 text-xs">
                        No matches found.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
