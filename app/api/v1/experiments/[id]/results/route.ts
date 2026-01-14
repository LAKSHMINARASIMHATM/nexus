import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    // Mock response
    return NextResponse.json({
        experiment_id: id,
        name: 'pagerank-weight-test',
        status: 'completed',
        results: {
            control: {
                queries: 450000,
                metrics: {
                    'ndcg@10': 0.951,
                    ctr: 0.385,
                    avg_dwell_time_seconds: 125,
                },
            },
            treatment: {
                queries: 50000,
                metrics: {
                    'ndcg@10': 0.958,
                    ctr: 0.392,
                    avg_dwell_time_seconds: 132,
                },
            },
            statistical_significance: {
                'ndcg@10': {
                    p_value: 0.002,
                    significant: true,
                    lift: 0.7,
                },
                ctr: {
                    p_value: 0.018,
                    significant: true,
                    lift: 1.8,
                },
            },
        },
        recommendation: 'deploy',
    });
}
