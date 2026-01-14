/**
 * Local Document Recommendations API
 * 
 * Provides recommendations based on documents in the local database
 */

import { NextRequest, NextResponse } from 'next/server';
import { localRecommendationService } from '@/lib/services/local-recommendation-service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/recommendations/local
 * 
 * Query parameters:
 * - type: 'popular' | 'trending' | 'similar' | 'related' | 'random' (required)
 * - limit: number (optional, default: 10, max: 50)
 * - offset: number (optional, default: 0)
 * - docId: string (required for type=similar)
 * - query: string (required for type=related)
 * 
 * Examples:
 * - /api/recommendations/local?type=popular&limit=10
 * - /api/recommendations/local?type=trending&limit=20
 * - /api/recommendations/local?type=similar&docId=123e4567-e89b-12d3-a456-426614174000&limit=10
 * - /api/recommendations/local?type=related&query=javascript&limit=15
 * - /api/recommendations/local?type=random&limit=5
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Parse and validate parameters
        const type = searchParams.get('type');
        const limitParam = searchParams.get('limit');
        const offsetParam = searchParams.get('offset');
        const docId = searchParams.get('docId');
        const query = searchParams.get('query');

        // Validate type parameter
        if (!type) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required parameter: type',
                    validTypes: ['popular', 'trending', 'similar', 'related', 'random'],
                },
                { status: 400 }
            );
        }

        const validTypes = ['popular', 'trending', 'similar', 'related', 'random'];
        if (!validTypes.includes(type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid type: ${type}`,
                    validTypes,
                },
                { status: 400 }
            );
        }

        // Parse limit and offset
        const limit = limitParam ? Math.min(parseInt(limitParam), 50) : 10;
        const offset = offsetParam ? parseInt(offsetParam) : 0;

        if (isNaN(limit) || limit < 1) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid limit: must be a number between 1 and 50',
                },
                { status: 400 }
            );
        }

        if (isNaN(offset) || offset < 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid offset: must be a non-negative number',
                },
                { status: 400 }
            );
        }

        // Get recommendations based on type
        let recommendations;

        switch (type) {
            case 'popular':
                recommendations = await localRecommendationService.getPopularDocuments({
                    limit,
                    offset,
                });
                break;

            case 'trending':
                recommendations = await localRecommendationService.getTrendingDocuments({
                    limit,
                    offset,
                });
                break;

            case 'similar':
                if (!docId) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: 'Missing required parameter for type=similar: docId',
                        },
                        { status: 400 }
                    );
                }
                recommendations = await localRecommendationService.getSimilarDocuments(
                    docId,
                    { limit, offset }
                );
                break;

            case 'related':
                if (!query) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: 'Missing required parameter for type=related: query',
                        },
                        { status: 400 }
                    );
                }
                recommendations = await localRecommendationService.getRelatedDocuments(
                    query,
                    { limit, offset }
                );
                break;

            case 'random':
                recommendations = await localRecommendationService.getRandomDocuments({
                    limit,
                    offset,
                });
                break;

            default:
                return NextResponse.json(
                    {
                        success: false,
                        error: `Unsupported type: ${type}`,
                    },
                    { status: 400 }
                );
        }

        // Get total document count for context
        const totalDocuments = await localRecommendationService.getDocumentCount();

        return NextResponse.json({
            success: true,
            type,
            recommendations,
            total: recommendations.length,
            totalDocuments,
            limit,
            offset,
        });
    } catch (error) {
        console.error('Error fetching local recommendations:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch recommendations',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
