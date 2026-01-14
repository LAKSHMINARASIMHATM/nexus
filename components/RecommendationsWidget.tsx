/**
 * Compact Recommendations Widget for Homepage
 * Shows popular documents with category filtering in a clean, minimal design
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface DocumentRecommendation {
    doc_id: string;
    url: string;
    title: string;
    meta_description: string | null;
    score: number;
    pagerank: number;
    category?: string;
}

const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'science', label: 'Science', icon: '🔬' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'education', label: 'Education', icon: '📚' },
];

export function RecommendationsWidget() {
    const [recommendations, setRecommendations] = useState<DocumentRecommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                const categoryParam = selectedCategory === 'all' ? '' : `&category=${selectedCategory}`;
                const response = await fetch(`/api/recommendations/local?type=popular&limit=5${categoryParam}`);
                const data = await response.json();

                if (data.success) {
                    setRecommendations(data.recommendations);
                }
            } catch (error) {
                console.error('Failed to fetch recommendations:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendations();
    }, [selectedCategory]);

    if (loading) {
        return (
            <Card className="border-2 border-foreground/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display text-xl">
                        <TrendingUp className="h-5 w-5" />
                        RECOMMENDED FOR YOU
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                            <div className="h-3 w-full bg-muted animate-pulse rounded" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <Card className="border-2 border-foreground/20 hover:border-foreground/40 transition-colors">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl">
                    <TrendingUp className="h-5 w-5" />
                    RECOMMENDED FOR YOU
                </CardTitle>
                <p className="text-sm text-muted-foreground font-body">
                    Popular documents from our index
                </p>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${selectedCategory === category.id
                                    ? 'bg-foreground text-background border-2 border-foreground'
                                    : 'bg-muted text-foreground/70 hover:bg-foreground/10 border-2 border-transparent hover:border-foreground/20'
                                }`}
                        >
                            <span className="mr-1">{category.icon}</span>
                            {category.label}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {recommendations.map((doc, index) => (
                    <a
                        key={doc.doc_id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                    >
                        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {doc.title}
                                    </h4>
                                    {doc.category && (
                                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                                            {doc.category}
                                        </span>
                                    )}
                                </div>
                                {doc.meta_description && (
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {doc.meta_description}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <ExternalLink className="h-3 w-3" />
                                        {new URL(doc.url).hostname}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}

                <a
                    href="/recommendations/local"
                    className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline mt-4 py-2"
                >
                    View All Recommendations →
                </a>
            </CardContent>
        </Card>
    );
}
