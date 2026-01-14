/**
 * React Hook for AI Recommendations
 * 
 * This hook provides an easy way to fetch recommendations
 * in React components
 */

import { useState, useEffect, useCallback } from 'react';
import { RecommendationClient, PredictionResponse, Recommendation } from '@/lib/services/recommendation-client';

// Create a singleton client instance
const recommendationClient = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

interface UseRecommendationsOptions {
    userId: number;
    k?: number;
    autoFetch?: boolean; // Automatically fetch on mount (default: true)
}

interface UseRecommendationsReturn {
    recommendations: Recommendation[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch recommendations for a user
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { recommendations, loading, error, refetch } = useRecommendations({
 *     userId: 1,
 *     k: 10
 *   });
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 * 
 *   return (
 *     <div>
 *       {recommendations.map(rec => (
 *         <div key={rec.item_id}>
 *           Item {rec.item_id}: {rec.score}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useRecommendations({
    userId,
    k = 10,
    autoFetch = true,
}: UseRecommendationsOptions): UseRecommendationsReturn {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendations = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await recommendationClient.getRecommendations(userId, k);
            setRecommendations(result.recommendations);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    }, [userId, k]);

    useEffect(() => {
        if (autoFetch) {
            fetchRecommendations();
        }
    }, [autoFetch, fetchRecommendations]);

    return {
        recommendations,
        loading,
        error,
        refetch: fetchRecommendations,
    };
}

interface UsePredictionsOptions {
    userId: number;
    itemIds: number[];
    autoFetch?: boolean;
}

interface UsePredictionsReturn {
    predictions: Recommendation[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to get predictions for specific items
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { predictions, loading, error } = usePredictions({
 *     userId: 1,
 *     itemIds: [1, 2, 3, 4, 5]
 *   });
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 * 
 *   return (
 *     <div>
 *       {predictions.map(pred => (
 *         <div key={pred.item_id}>
 *           Item {pred.item_id}: {pred.score}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePredictions({
    userId,
    itemIds,
    autoFetch = true,
}: UsePredictionsOptions): UsePredictionsReturn {
    const [predictions, setPredictions] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState<string | null>(null);

    const fetchPredictions = useCallback(async () => {
        if (itemIds.length === 0) {
            setPredictions([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const result = await recommendationClient.predict(userId, itemIds);
            setPredictions(result.recommendations);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
            setPredictions([]);
        } finally {
            setLoading(false);
        }
    }, [userId, itemIds]);

    useEffect(() => {
        if (autoFetch) {
            fetchPredictions();
        }
    }, [autoFetch, fetchPredictions]);

    return {
        predictions,
        loading,
        error,
        refetch: fetchPredictions,
    };
}

/**
 * Hook to check API health
 */
export function useRecommendationHealth() {
    const [healthy, setHealthy] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkHealth() {
            try {
                const health = await recommendationClient.healthCheck();
                setHealthy(health.status === 'healthy');
            } catch {
                setHealthy(false);
            } finally {
                setLoading(false);
            }
        }

        checkHealth();
    }, []);

    return { healthy, loading };
}
