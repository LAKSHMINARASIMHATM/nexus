import { NextResponse } from 'next/server';
import { metricsService } from '@/lib/services/metrics-service';

export async function GET() {
    try {
        const stats = await metricsService.getIndexStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Index stats error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
