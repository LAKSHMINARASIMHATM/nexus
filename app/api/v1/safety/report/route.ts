import { NextRequest, NextResponse } from 'next/server';
import { safetyDetectionService, SafetyStatus } from '@/lib/services/safety-detection-service';
import { withRateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit';
import { z } from 'zod';

/**
 * Safety Report API Endpoint
 * POST /api/v1/safety/report
 * 
 * Allows users to report false positives/negatives or new threats
 */

const safetyReportSchema = z.object({
    url: z.string().url(),
    reportType: z.enum(['false_positive', 'false_negative', 'new_threat']),
    currentStatus: z.nativeEnum(SafetyStatus),
    userClaimedStatus: z.nativeEnum(SafetyStatus),
    description: z.string().optional(),
});

async function safetyReportHandler(req: NextRequest) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
        const body = await req.json();
        const validation = safetyReportSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'VALIDATION_ERROR',
                    message: 'Invalid request parameters',
                    details: validation.error.errors,
                    requestId,
                },
                { status: 400 }
            );
        }

        const sessionId = req.headers.get('x-session-id') || undefined;
        const userId = req.headers.get('x-user-id') || undefined;

        const reportId = await safetyDetectionService.reportSafety({
            ...validation.data,
            userId,
            sessionId,
        });

        return NextResponse.json({
            success: true,
            reportId,
            message: 'Thank you for your report. We will review it shortly.',
            requestId,
        });
    } catch (error: any) {
        console.error('Safety report API error:', error);

        return NextResponse.json(
            {
                error: 'INTERNAL_ERROR',
                message: 'An internal server error occurred',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined,
                requestId,
            },
            { status: 500 }
        );
    }
}

export const POST = withRateLimit(safetyReportHandler, {
    ...rateLimitConfigs.search,
    maxRequests: 20, // More restrictive for reports
});
