/**
 * Example React Component using the Recommendation Client
 * 
 * This demonstrates a complete UI component that displays
 * AI-powered recommendations for users
 */

'use client';

import { useRecommendations } from '@/hooks/use-recommendations';
import { useState } from 'react';

export function RecommendationDemo() {
    const [userId, setUserId] = useState(1);
    const [k, setK] = useState(10);

    const { recommendations, loading, error, refetch } = useRecommendations({
        userId,
        k,
        autoFetch: true,
    });

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">AI Recommendation System</h1>
                <p className="text-gray-600">
                    Powered by AI deployed at{' '}
                    <a
                        href="https://ai-recommendation-system-lt3w.onrender.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Render.com
                    </a>
                </p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium mb-2">
                            User ID
                        </label>
                        <input
                            id="userId"
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                        />
                    </div>

                    <div>
                        <label htmlFor="k" className="block text-sm font-medium mb-2">
                            Number of Recommendations
                        </label>
                        <input
                            id="k"
                            type="number"
                            value={k}
                            onChange={(e) => setK(parseInt(e.target.value) || 10)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                            max="50"
                        />
                    </div>
                </div>

                <button
                    onClick={() => refetch()}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Loading...' : 'Get Recommendations'}
                </button>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Recommendations for User {userId}
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
                        No recommendations found
                    </div>
                )}

                {!loading && !error && recommendations.length > 0 && (
                    <div className="space-y-2">
                        <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-lg font-semibold text-sm">
                            <div className="col-span-1">Rank</div>
                            <div className="col-span-3">Item ID</div>
                            <div className="col-span-4">Score</div>
                            <div className="col-span-4">Confidence</div>
                        </div>

                        {recommendations.map((rec, index) => (
                            <div
                                key={rec.item_id}
                                className="grid grid-cols-12 gap-4 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="col-span-1 flex items-center">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                                        {index + 1}
                                    </span>
                                </div>

                                <div className="col-span-3 flex items-center">
                                    <span className="font-mono text-sm">
                                        Item {rec.item_id}
                                    </span>
                                </div>

                                <div className="col-span-4 flex items-center">
                                    <div className="w-full">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold">
                                                {rec.score.toFixed(4)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all"
                                                style={{ width: `${rec.score * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-4 flex items-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${rec.score > 0.9
                                                ? 'bg-green-100 text-green-700'
                                                : rec.score > 0.7
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {rec.score > 0.9
                                            ? 'Very High'
                                            : rec.score > 0.7
                                                ? 'High'
                                                : rec.score > 0.5
                                                    ? 'Medium'
                                                    : 'Low'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && recommendations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-blue-600">
                                    {recommendations.length}
                                </p>
                                <p className="text-sm text-gray-600">Total Items</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">
                                    {(
                                        recommendations.reduce((sum, r) => sum + r.score, 0) /
                                        recommendations.length
                                    ).toFixed(4)}
                                </p>
                                <p className="text-sm text-gray-600">Avg Score</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-purple-600">
                                    {Math.max(...recommendations.map((r) => r.score)).toFixed(4)}
                                </p>
                                <p className="text-sm text-gray-600">Top Score</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
