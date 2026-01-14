/**
 * Local Document Recommendation Demo Component
 * 
 * Displays recommendations from the local search engine database
 */

'use client';

import { useState, useEffect } from 'react';

interface DocumentRecommendation {
    doc_id: string;
    url: string;
    title: string;
    meta_description: string | null;
    score: number;
    pagerank: number;
    created_at: string;
}

interface RecommendationResponse {
    success: boolean;
    type: string;
    recommendations: DocumentRecommendation[];
    total: number;
    totalDocuments: number;
    error?: string;
}

export function LocalRecommendationDemo() {
    const [type, setType] = useState<'popular' | 'trending' | 'related' | 'random'>('popular');
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState('');
    const [recommendations, setRecommendations] = useState<DocumentRecommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalDocuments, setTotalDocuments] = useState(0);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            setError(null);

            let url = `/api/recommendations/local?type=${type}&limit=${limit}`;

            if (type === 'related' && query) {
                url += `&query=${encodeURIComponent(query)}`;
            }

            const response = await fetch(url);
            const data: RecommendationResponse = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch recommendations');
            }

            setRecommendations(data.recommendations);
            setTotalDocuments(data.totalDocuments);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (type !== 'related' || query) {
            fetchRecommendations();
        }
    }, [type, limit]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === 'related' && query) {
            fetchRecommendations();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">📚 Document Recommendations</h1>
                <p className="text-gray-600">
                    Discover documents from your local search engine database
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Total indexed documents: <strong>{totalDocuments.toLocaleString()}</strong>
                </p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium mb-2">
                            Recommendation Type
                        </label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="popular">🔥 Popular (High PageRank)</option>
                            <option value="trending">📈 Trending (Recently Added)</option>
                            <option value="related">🔍 Related (Search Query)</option>
                            <option value="random">🎲 Random (Discovery)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="limit" className="block text-sm font-medium mb-2">
                            Number of Results
                        </label>
                        <input
                            id="limit"
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                            max="50"
                        />
                    </div>
                </div>

                {type === 'related' && (
                    <form onSubmit={handleSearch} className="space-y-2">
                        <label htmlFor="query" className="block text-sm font-medium">
                            Search Query
                        </label>
                        <div className="flex gap-2">
                            <input
                                id="query"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter search terms..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                disabled={loading || !query}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                )}

                {type !== 'related' && (
                    <button
                        onClick={fetchRecommendations}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Loading...' : 'Get Recommendations'}
                    </button>
                )}
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    {type === 'popular' && '🔥 Popular Documents'}
                    {type === 'trending' && '📈 Trending Documents'}
                    {type === 'related' && '🔍 Related Documents'}
                    {type === 'random' && '🎲 Random Documents'}
                    {recommendations.length > 0 && ` (${recommendations.length})`}
                </h2>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        <p className="font-semibold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {!loading && !error && recommendations.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        {type === 'related' && !query
                            ? 'Enter a search query to find related documents'
                            : 'No documents found'}
                    </div>
                )}

                {!loading && !error && recommendations.length > 0 && (
                    <div className="space-y-4">
                        {recommendations.map((doc, index) => (
                            <div
                                key={doc.doc_id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold">
                                            {index + 1}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-600 hover:underline"
                                            >
                                                {doc.title}
                                            </a>
                                        </h3>

                                        <p className="text-sm text-green-600 mb-2 truncate">
                                            {doc.url}
                                        </p>

                                        {doc.meta_description && (
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {doc.meta_description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                                PageRank: {doc.pagerank.toFixed(4)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                Score: {doc.score.toFixed(4)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(doc.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
