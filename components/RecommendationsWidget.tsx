/**
 * Enhanced Recommendations Widget for Homepage
 * Shows popular, trending, and personalized documents with a premium design
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, TrendingUp, Zap, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalRecommendations, RecommendationType } from '@/hooks/use-local-recommendations';
import { useRecommendations } from '@/hooks/use-recommendations';
import { cn } from '@/lib/utils';

interface DocumentRecommendation {
    doc_id: string;
    url: string;
    title: string;
    meta_description: string | null;
    score: number;
    pagerank: number;
    category?: string;
}

interface RecommendationsWidgetProps {
    initialData?: DocumentRecommendation[];
}

const TABS = [
    { id: 'popular', label: 'Popular', icon: TrendingUp, color: 'text-blue-500' },
    { id: 'trending', label: 'Trending', icon: Zap, color: 'text-amber-500' },
    { id: 'foryou', label: 'For You', icon: Sparkles, color: 'text-purple-500' },
];

const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'science', label: 'Science', icon: '🔬' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'education', label: 'Education', icon: '📚' },
];

export function RecommendationsWidget({ initialData }: RecommendationsWidgetProps) {
    const [activeTab, setActiveTab] = useState<'popular' | 'trending' | 'foryou'>('popular');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Local recommendations (Popular/Trending)
    const {
        recommendations: localRecs,
        loading: localLoading,
    } = useLocalRecommendations({
        type: activeTab === 'foryou' ? 'popular' : activeTab as RecommendationType,
        limit: 6,
        initialData: activeTab === 'popular' ? initialData : undefined,
        autoFetch: activeTab !== 'foryou',
    });

    // AI recommendations (For You)
    // Using a mock userId 1 for demonstration if no auth is present
    const {
        recommendations: aiRecs,
        loading: aiLoading,
    } = useRecommendations({
        userId: 1,
        k: 6,
        autoFetch: activeTab === 'foryou',
    });

    const loading = activeTab === 'foryou' ? aiLoading : localLoading;

    // Transform AI recommendations to match DocumentRecommendation interface if needed
    // Note: In a real app, you'd fetch full doc details for these IDs
    const displayRecommendations = useMemo(() => {
        if (activeTab === 'foryou') {
            // This is a simplification. In reality, you'd fetch doc details for these item_ids
            // For now, we'll show local popular as fallback or mock data
            return aiRecs.length > 0 ? aiRecs.map(r => ({
                doc_id: r.item_id.toString(),
                url: '#',
                title: `Recommended Item ${r.item_id}`,
                meta_description: 'Personalized recommendation based on your interests.',
                score: r.score,
                pagerank: r.score,
                category: 'Personalized'
            })) : localRecs;
        }

        if (selectedCategory === 'all') return localRecs;
        return localRecs.filter(r => r.category?.toLowerCase().includes(selectedCategory.toLowerCase()));
    }, [activeTab, aiRecs, localRecs, selectedCategory]);

    return (
        <Card className="border-2 border-foreground/10 shadow-xl overflow-hidden bg-background/50 backdrop-blur-sm hover:border-foreground/20 transition-all duration-500">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-4">
                    <CardTitle className="flex items-center gap-2 font-display text-2xl tracking-tight">
                        <div className="p-2 bg-foreground text-background rounded-xl shadow-lg">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        DISCOVER
                    </CardTitle>
                    <div className="flex bg-muted/50 p-1 rounded-xl border border-foreground/5">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300",
                                    activeTab === tab.id
                                        ? "bg-background text-foreground shadow-sm scale-105"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                )}
                            >
                                <tab.icon className={cn("h-3.5 w-3.5", activeTab === tab.id ? tab.color : "")} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Tabs - Only show for local tabs */}
                <AnimatePresence mode="wait">
                    {activeTab !== 'foryou' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-wrap gap-2 mt-2"
                        >
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={cn(
                                        "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all duration-300",
                                        selectedCategory === category.id
                                            ? "bg-foreground text-background border-foreground shadow-md"
                                            : "bg-background/50 text-muted-foreground border-foreground/10 hover:border-foreground/30"
                                    )}
                                >
                                    <span className="mr-1.5">{category.icon}</span>
                                    {category.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardHeader>

            <CardContent className="p-0">
                <div className="relative min-h-[350px]">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-6 space-y-4"
                            >
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-12 w-12 bg-muted animate-pulse rounded-xl" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                                            <div className="h-3 w-full bg-muted animate-pulse rounded" />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : displayRecommendations.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="p-4 bg-muted rounded-full mb-4">
                                    <Clock className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-bold text-lg">No recommendations yet</h3>
                                <p className="text-sm text-muted-foreground max-w-[200px]">
                                    Try exploring different categories or check back later.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeTab + selectedCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="divide-y divide-foreground/5"
                            >
                                {displayRecommendations.map((doc, index) => (
                                    <motion.a
                                        key={doc.doc_id}
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group block p-4 hover:bg-muted/30 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/5 flex items-center justify-center text-sm font-black group-hover:scale-110 group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                                                {index + 1}
                                                {doc.pagerank > 0.8 && (
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-background shadow-sm" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <h4 className="font-bold text-sm leading-tight group-hover:text-blue-500 transition-colors line-clamp-1">
                                                        {doc.title}
                                                    </h4>
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                                                </div>
                                                {doc.meta_description && (
                                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2 group-hover:text-foreground/70 transition-colors">
                                                        {doc.meta_description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-3">
                                                    {doc.category && (
                                                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-500/20">
                                                            {doc.category}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                                                        <ExternalLink className="h-2.5 w-2.5" />
                                                        {new URL(doc.url).hostname.replace('www.', '')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-4 bg-muted/20 border-t border-foreground/5">
                    <a
                        href="/recommendations/local"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-widest hover:bg-foreground/90 hover:shadow-lg active:scale-95 transition-all duration-300"
                    >
                        Explore Full Directory
                        <ChevronRight className="h-4 w-4" />
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
