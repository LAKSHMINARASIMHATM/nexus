import { NextRequest, NextResponse } from 'next/server';
import { hybridSearchService } from '@/lib/services/hybrid-search-service';
import { interactionService } from '@/lib/services/interaction-service';
import { queryCounter, queryLatency, queryResultCount } from '@/lib/metrics/prometheus';
import { searchRequestSchema, createErrorResponse } from '@/lib/validation/schemas';
import { withRateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit';

/**
 * Search API endpoint
 * POST /api/v1/search
 * 
 * Features:
 * - Input validation and sanitization
 * - Rate limiting (60 req/min per IP)
 * - Hybrid search (Cache → Elasticsearch → PostgreSQL)
 * - Comprehensive error handling
 * - Metrics collection
 */

async function searchHandler(req: NextRequest) {
    const startTime = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
        // Parse and validate request body
        const body = await req.json();
        const validation = searchRequestSchema.safeParse(body);

        if (!validation.success) {
            queryCounter.inc({ status: 'error', cache_hit: 'false' });
            return NextResponse.json(
                createErrorResponse(
                    'VALIDATION_ERROR',
                    'Invalid request parameters',
                    validation.error.errors,
                    requestId
                ),
                { status: 400 }
            );
        }

        const { query, page, page_size, filters, options } = validation.data;

        // Execute hybrid search (Cache → PostgreSQL fallback, skip Elasticsearch)
        const searchStart = Date.now();
        const results = await hybridSearchService.search({
            query,
            page,
            pageSize: page_size,
            filters,
            useCache: true,
            preferElasticsearch: process.env.ENABLE_ELASTICSEARCH === 'true', // Configurable via env
        });
        const executionTime = Date.now() - searchStart;

        // Log search event
        const sessionId = req.headers.get('x-session-id') || 'anonymous';
        const userId = req.headers.get('x-user-id') || undefined;

        let eventId = '';
        try {
            eventId = await interactionService.logSearchEvent({
                user_id: userId,
                session_id: sessionId,
                query,
                result_count: results.total_results,
                execution_time_ms: executionTime,
            });
        } catch (err) {
            console.error('Error logging search event:', err);
        }

        // Record metrics
        queryCounter.inc({ status: 'success', cache_hit: 'false' });
        queryResultCount.observe(results.results.length);
        queryLatency.observe({ stage: 'total' }, (Date.now() - startTime) / 1000);

        // Add response headers
        const headers = new Headers();
        headers.set('X-Request-ID', requestId);
        headers.set('X-Query-Time-Ms', executionTime.toString());

        return NextResponse.json(
            {
                ...results,
                meta: {
                    search_event_id: eventId,
                    request_id: requestId,
                },
            },
            { headers }
        );
    } catch (error: any) {
        console.error('Search API error:', error);
        queryCounter.inc({ status: 'error', cache_hit: 'false' });

        // Determine error type and status code
        let statusCode = 500;
        let errorCode = 'INTERNAL_ERROR';
        let errorMessage = 'An internal server error occurred';

        if (error.message === 'Search service temporarily unavailable') {
            statusCode = 503;
            errorCode = 'SERVICE_UNAVAILABLE';
            errorMessage = error.message;
        }

        return NextResponse.json(
            createErrorResponse(
                errorCode,
                errorMessage,
                process.env.NODE_ENV === 'development' ? error.message : undefined,
                requestId
            ),
            { status: statusCode }
        );
    }
}

// Export with rate limiting
export const POST = withRateLimit(searchHandler, rateLimitConfigs.search);
