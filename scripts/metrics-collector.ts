/**
 * Metrics Collector
 * 
 * Collects and analyzes metrics from autonomous browser sessions
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface SessionMetrics {
    persona: 'casual' | 'power' | 'research';
    duration: number; // milliseconds
    searches: number;
    clicks: number;
    recommendationsViewed: number;
}

export interface TestResult {
    name: string;
    passed: boolean;
    timestamp: number;
}

export class MetricsCollector {
    private sessions: SessionMetrics[] = [];
    private clicks: number[] = []; // timestamp of clicks
    private recommendationClicks: number = 0;
    private impressions: number = 0;
    private tests: TestResult[] = [];

    /**
     * Record a user session
     */
    recordSession(session: SessionMetrics) {
        this.sessions.push(session);
        this.impressions += session.searches;
    }

    /**
     * Record a click event
     */
    recordClick(timestamp: number) {
        this.clicks.push(timestamp);
    }

    /**
     * Record a recommendation click
     */
    recordRecommendationClick() {
        this.recommendationClicks++;
    }

    /**
     * Record a test result
     */
    recordTest(name: string, passed: boolean) {
        this.tests.push({
            name,
            passed,
            timestamp: Date.now(),
        });
    }

    /**
     * Calculate Click-Through Rate (CTR)
     */
    calculateCTR(): number {
        if (this.impressions === 0) return 0;
        return (this.clicks.length / this.impressions) * 100;
    }

    /**
     * Calculate average session duration
     */
    calculateAvgSessionDuration(): number {
        if (this.sessions.length === 0) return 0;
        const total = this.sessions.reduce((sum, s) => sum + s.duration, 0);
        return total / this.sessions.length;
    }

    /**
     * Calculate engagement rate
     */
    calculateEngagementRate(): number {
        if (this.sessions.length === 0) return 0;
        const engagedSessions = this.sessions.filter(s => s.clicks > 0).length;
        return (engagedSessions / this.sessions.length) * 100;
    }

    /**
     * Calculate recommendation CTR
     */
    calculateRecommendationCTR(): number {
        const totalRecommendations = this.sessions.reduce(
            (sum, s) => sum + s.recommendationsViewed,
            0
        );
        if (totalRecommendations === 0) return 0;
        return (this.recommendationClicks / totalRecommendations) * 100;
    }

    /**
     * Get metrics by persona
     */
    getMetricsByPersona(persona: 'casual' | 'power' | 'research') {
        const personaSessions = this.sessions.filter(s => s.persona === persona);

        if (personaSessions.length === 0) {
            return {
                count: 0,
                avgDuration: 0,
                avgClicks: 0,
                avgSearches: 0,
                ctr: 0,
            };
        }

        const totalClicks = personaSessions.reduce((sum, s) => sum + s.clicks, 0);
        const totalSearches = personaSessions.reduce((sum, s) => sum + s.searches, 0);
        const totalDuration = personaSessions.reduce((sum, s) => sum + s.duration, 0);

        return {
            count: personaSessions.length,
            avgDuration: totalDuration / personaSessions.length,
            avgClicks: totalClicks / personaSessions.length,
            avgSearches: totalSearches / personaSessions.length,
            ctr: totalSearches > 0 ? (totalClicks / totalSearches) * 100 : 0,
        };
    }

    /**
     * Generate comprehensive report
     */
    generateReport(): string {
        const report: string[] = [];

        // Overall metrics
        report.push('\n📊 OVERALL METRICS\n');
        report.push(`Total Sessions: ${this.sessions.length}`);
        report.push(`Total Searches: ${this.impressions}`);
        report.push(`Total Clicks: ${this.clicks.length}`);
        report.push(`Overall CTR: ${this.calculateCTR().toFixed(2)}%`);
        report.push(`Engagement Rate: ${this.calculateEngagementRate().toFixed(2)}%`);
        report.push(`Avg Session Duration: ${(this.calculateAvgSessionDuration() / 1000).toFixed(1)}s`);

        // Recommendation metrics
        report.push('\n🎯 RECOMMENDATION METRICS\n');
        const totalRecs = this.sessions.reduce((sum, s) => sum + s.recommendationsViewed, 0);
        report.push(`Total Recommendations Shown: ${totalRecs}`);
        report.push(`Recommendation Clicks: ${this.recommendationClicks}`);
        report.push(`Recommendation CTR: ${this.calculateRecommendationCTR().toFixed(2)}%`);

        // Persona breakdown
        report.push('\n👥 METRICS BY PERSONA\n');

        const casual = this.getMetricsByPersona('casual');
        report.push(`Casual Users (${casual.count} sessions):`);
        report.push(`  Avg Duration: ${(casual.avgDuration / 1000).toFixed(1)}s`);
        report.push(`  Avg Clicks: ${casual.avgClicks.toFixed(1)}`);
        report.push(`  CTR: ${casual.ctr.toFixed(2)}%`);

        const power = this.getMetricsByPersona('power');
        report.push(`\nPower Users (${power.count} sessions):`);
        report.push(`  Avg Duration: ${(power.avgDuration / 1000).toFixed(1)}s`);
        report.push(`  Avg Clicks: ${power.avgClicks.toFixed(1)}`);
        report.push(`  CTR: ${power.ctr.toFixed(2)}%`);

        const research = this.getMetricsByPersona('research');
        report.push(`\nResearch Users (${research.count} sessions):`);
        report.push(`  Avg Duration: ${(research.avgDuration / 1000).toFixed(1)}s`);
        report.push(`  Avg Clicks: ${research.avgClicks.toFixed(1)}`);
        report.push(`  CTR: ${research.ctr.toFixed(2)}%`);

        // Test results
        if (this.tests.length > 0) {
            report.push('\n🧪 TEST RESULTS\n');
            this.tests.forEach(test => {
                const status = test.passed ? '✅' : '❌';
                report.push(`${status} ${test.name}`);
            });
            const passRate = (this.tests.filter(t => t.passed).length / this.tests.length) * 100;
            report.push(`\nPass Rate: ${passRate.toFixed(0)}%`);
        }

        // Performance insights
        report.push('\n💡 INSIGHTS\n');

        const overallCTR = this.calculateCTR();
        if (overallCTR > 50) {
            report.push(`✅ Excellent CTR (${overallCTR.toFixed(0)}%) - Users are highly engaged!`);
        } else if (overallCTR > 30) {
            report.push(`✅ Good CTR (${overallCTR.toFixed(0)}%) - Strong user engagement`);
        } else {
            report.push(`⚠️  CTR could be improved (${overallCTR.toFixed(0)}%)`);
        }

        const recCTR = this.calculateRecommendationCTR();
        if (recCTR > 40) {
            report.push(`✅ Recommendations are performing well (${recCTR.toFixed(0)}% CTR)`);
        } else if (recCTR > 20) {
            report.push(`✅ Recommendations showing moderate engagement (${recCTR.toFixed(0)}% CTR)`);
        }

        const avgDuration = this.calculateAvgSessionDuration() / 1000;
        if (avgDuration > 60) {
            report.push(`✅ High session engagement (${avgDuration.toFixed(0)}s avg)`);
        } else if (avgDuration > 30) {
            report.push(`✅ Moderate session engagement (${avgDuration.toFixed(0)}s avg)`);
        }

        return report.join('\n');
    }

    /**
     * Save report to JSON file
     */
    async saveReport(filepath: string) {
        const data = {
            timestamp: new Date().toISOString(),
            summary: {
                totalSessions: this.sessions.length,
                totalSearches: this.impressions,
                totalClicks: this.clicks.length,
                overallCTR: this.calculateCTR(),
                engagementRate: this.calculateEngagementRate(),
                avgSessionDuration: this.calculateAvgSessionDuration(),
                recommendationCTR: this.calculateRecommendationCTR(),
            },
            personas: {
                casual: this.getMetricsByPersona('casual'),
                power: this.getMetricsByPersona('power'),
                research: this.getMetricsByPersona('research'),
            },
            tests: this.tests,
            sessions: this.sessions,
        };

        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    }

    /**
     * Export metrics to CSV
     */
    async exportCSV(filepath: string) {
        const rows: string[] = [];

        // Header
        rows.push('Persona,Duration(s),Searches,Clicks,RecommendationsViewed,CTR(%)');

        // Data rows
        this.sessions.forEach(session => {
            const ctr = session.searches > 0 ? (session.clicks / session.searches) * 100 : 0;
            rows.push([
                session.persona,
                (session.duration / 1000).toFixed(1),
                session.searches,
                session.clicks,
                session.recommendationsViewed,
                ctr.toFixed(2),
            ].join(','));
        });

        await fs.writeFile(filepath, rows.join('\n'));
    }
}
