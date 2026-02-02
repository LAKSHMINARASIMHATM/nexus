/**
 * Browser Scenarios
 * 
 * Defines different user personas and their behavior patterns
 */

import { Page } from 'playwright';
import { MetricsCollector } from './metrics-collector.js';

export class BrowserScenarios {
    constructor(private metricsCollector: MetricsCollector) { }

    /**
     * Casual User - Quick browsing, low engagement
     */
    async runCasualUser(page: Page, baseUrl: string) {
        console.log('👤 Running Casual User scenario...');
        const sessionStart = Date.now();

        try {
            await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await this.wait(2000);

            // Quick search
            const queries = ['AI', 'python', 'web development'];
            const query = queries[Math.floor(Math.random() * queries.length)];

            await this.typeWithHumanDelay(page, query);
            await this.wait(1500);

            // Maybe click one result (50% chance)
            if (Math.random() > 0.5) {
                await this.clickRandomResult(page);
                this.metricsCollector.recordClick(sessionStart);
            }

            const sessionEnd = Date.now();
            const duration = sessionEnd - sessionStart;

            this.metricsCollector.recordSession({
                persona: 'casual',
                duration,
                searches: 1,
                clicks: Math.random() > 0.5 ? 1 : 0,
                recommendationsViewed: 0,
            });

            console.log(`  ✅ Casual user completed (${(duration / 1000).toFixed(1)}s)`);
        } catch (error) {
            console.error('  ❌ Casual user scenario failed:', error);
        }
    }

    /**
     * Power User - Targeted searches, high engagement
     */
    async runPowerUser(page: Page, baseUrl: string) {
        console.log('⚡ Running Power User scenario...');
        const sessionStart = Date.now();

        try {
            await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await this.wait(2000);

            // Multiple targeted searches
            const queries = [
                'machine learning algorithms',
                'deep learning neural networks',
                'pytorch tutorials',
                'transformer architecture'
            ];

            let totalClicks = 0;
            let recommendationsViewed = 0;

            for (let i = 0; i < 3; i++) {
                const query = queries[Math.floor(Math.random() * queries.length)];
                await this.typeWithHumanDelay(page, query);
                await this.wait(1000);

                // High click-through rate (80%)
                if (Math.random() > 0.2) {
                    await this.clickRandomResult(page);
                    totalClicks++;
                    this.metricsCollector.recordClick(sessionStart);
                }

                await this.wait(500);

                // Navigate back to search
                try {
                    await page.goBack({ timeout: 5000, waitUntil: 'domcontentloaded' });
                } catch {
                    // If goBack fails, just goto the base URL
                    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => { });
                }
                await this.wait(1000);
            }

            // Visit discovery page
            try {
                await page.goto(`${baseUrl}/discovery`, { waitUntil: 'domcontentloaded', timeout: 30000 });
                await this.wait(2000);
                recommendationsViewed = 5;

                // Click on recommendation (60% chance)
                if (Math.random() > 0.4) {
                    await this.clickRandomResult(page);
                    totalClicks++;
                    this.metricsCollector.recordRecommendationClick();
                }
            } catch (error) {
                console.log('  ⚠️  Discovery page not available');
            }

            const sessionEnd = Date.now();
            const duration = sessionEnd - sessionStart;

            this.metricsCollector.recordSession({
                persona: 'power',
                duration,
                searches: 3,
                clicks: totalClicks,
                recommendationsViewed,
            });

            console.log(`  ✅ Power user completed (${(duration / 1000).toFixed(1)}s, ${totalClicks} clicks)`);
        } catch (error) {
            console.error('  ❌ Power user scenario failed:', error);
        }
    }

    /**
     * Research User - Deep exploration, extended engagement
     */
    async runResearchUser(page: Page, baseUrl: string) {
        console.log('🔬 Running Research User scenario...');
        const sessionStart = Date.now();

        try {
            await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await this.wait(2000);

            // Deep research queries
            const queries = [
                'attention mechanism transformers',
                'bert model architecture',
                'GPT neural network design',
                'multi-head attention implementation',
                'transformer positional encoding'
            ];

            let totalClicks = 0;
            let recommendationsViewed = 0;

            // Multiple research searches
            for (let i = 0; i < 5; i++) {
                const query = queries[Math.floor(Math.random() * queries.length)];
                await this.typeWithHumanDelay(page, query);
                await this.wait(1500);

                // Read results (scroll)
                await this.scrollSlowly(page);

                // High engagement - click multiple results
                const clickCount = Math.floor(Math.random() * 3) + 1;
                for (let c = 0; c < clickCount; c++) {
                    await this.clickRandomResult(page);
                    totalClicks++;
                    this.metricsCollector.recordClick(sessionStart);
                    await this.wait(2000); // Read content

                    // Navigate back
                    try {
                        await page.goBack({ timeout: 5000, waitUntil: 'domcontentloaded' });
                    } catch {
                        await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => { });
                    }
                    await this.wait(500);
                }

                await this.wait(1000);
            }

            // Explore discovery features
            try {
                await page.goto(`${baseUrl}/discovery`, { waitUntil: 'domcontentloaded', timeout: 30000 });
                await this.wait(2000);

                await this.scrollSlowly(page);
                recommendationsViewed = 10;

                // Click multiple recommendations
                for (let i = 0; i < 3; i++) {
                    await this.clickRandomResult(page);
                    totalClicks++;
                    this.metricsCollector.recordRecommendationClick();
                    await this.wait(1500);
                    await page.goBack({ timeout: 5000 }).catch(() => { });
                    await this.wait(500);
                }
            } catch (error) {
                console.log('  ⚠️  Discovery page not available');
            }

            const sessionEnd = Date.now();
            const duration = sessionEnd - sessionStart;

            this.metricsCollector.recordSession({
                persona: 'research',
                duration,
                searches: 5,
                clicks: totalClicks,
                recommendationsViewed,
            });

            console.log(`  ✅ Research user completed (${(duration / 1000).toFixed(1)}s, ${totalClicks} clicks)`);
        } catch (error) {
            console.error('  ❌ Research user scenario failed:', error);
        }
    }

    /**
     * Type with human-like delays
     */
    private async typeWithHumanDelay(page: Page, text: string) {
        const input = page.locator('input[name="search"], input[placeholder*="searching"], input[placeholder*="Ask"]').first();
        await input.waitFor({ state: 'visible', timeout: 15000 }).catch(() => { });
        await input.clear().catch(() => { });

        for (const char of text) {
            await input.type(char, { delay: Math.random() * 100 + 50 });
        }
    }

    /**
     * Click a random search result
     */
    private async clickRandomResult(page: Page) {
        try {
            // Try different selectors for results
            const selectors = [
                'article a[href*="http"]',
                '.result-item a',
                'a[href*="http"]',
                'article',
            ];

            for (const selector of selectors) {
                const results = page.locator(selector);
                const count = await results.count();

                if (count > 0) {
                    const randomIndex = Math.floor(Math.random() * Math.min(count, 5));
                    await results.nth(randomIndex).click({ timeout: 3000 });
                    return;
                }
            }
        } catch (error) {
            // Silent fail - result might not be clickable
        }
    }

    /**
     * Scroll page slowly (simulate reading)
     */
    private async scrollSlowly(page: Page) {
        const scrollSteps = 3;
        for (let i = 0; i < scrollSteps; i++) {
            await page.evaluate(() => window.scrollBy(0, 300));
            await this.wait(500);
        }
    }

    /**
     * Wait utility
     */
    private async wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
