import { NextRequest, NextResponse } from 'next/server';
import { getMetrics } from '@/lib/metrics/prometheus';

export async function GET(req: NextRequest) {
    const metrics = await getMetrics();
    return new NextResponse(metrics, {
        headers: {
            'Content-Type': 'text/plain; version=0.0.4',
        },
    });
}
