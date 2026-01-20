
import { useState, useEffect, useCallback } from 'react';
import { DocumentRecommendation } from '@/lib/services/local-recommendation-service';

export type RecommendationType = 'popular' | 'trending' | 'similar' | 'related' | 'random';

interface UseLocalRecommendationsOptions {
    type?: RecommendationType;
    limit?: number;
    offset?: number;
    docId?: string; // Required for 'similar' type
    query?: string; // Required for 'related' type
    autoFetch?: boolean;
    initialData?: DocumentRecommendation[];
    skipFetchIfInitial?: boolean;
}

interface UseLocalRecommendationsReturn {
    recommendations: DocumentRecommendation[];
    loading: boolean;
    error: string | null;
    total: number;
    refetch: () => Promise<void>;
}

export function useLocalRecommendations({
    type = 'popular',
    limit = 5,
    offset = 0,
    docId,
    query,
    autoFetch = true,
    initialData,
    skipFetchIfInitial = false,
}: UseLocalRecommendationsOptions = {}): UseLocalRecommendationsReturn {
    const [recommendations, setRecommendations] = useState<DocumentRecommendation[]>(initialData || []);
    const [loading, setLoading] = useState(autoFetch && !initialData);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(initialData?.length || 0);

    const fetchRecommendations = useCallback(async (isRefetch = false) => {
        if (!isRefetch && skipFetchIfInitial && initialData && initialData.length > 0) {
            return;
        }
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                type,
                limit: limit.toString(),
                offset: offset.toString(),
            });

            if (docId) params.append('docId', docId);
            if (query) params.append('query', query);

            const response = await fetch(`/api/recommendations/local?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch recommendations');
            }

            setRecommendations(data.recommendations);
            setTotal(data.total);
        } catch (err) {
            console.error('Error fetching local recommendations:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    }, [type, limit, offset, docId, query]);

    useEffect(() => {
        if (autoFetch) {
            fetchRecommendations();
        }
    }, [autoFetch, fetchRecommendations]);

    return {
        recommendations,
        loading,
        error,
        total,
        refetch: () => fetchRecommendations(true),
    };
}
