import { NextRequest, NextResponse } from 'next/server';
import { metricsService } from '@/lib/services/metrics-service';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const period = searchParams.get('period') || '1h';

    try {
        const metrics = await metricsService.getMetrics(period);
        return NextResponse.json(metrics);
    } catch (error) {
        console.error('Metrics error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
