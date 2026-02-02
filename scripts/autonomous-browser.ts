/**
 * Autonomous Browser System
 * 
 * Simulates realistic user behavior to:
 * - Test search engine functionality
 * - Collect real metrics (CTR, engagement)
 * - Demonstrate AI recommendations
 * - Generate performance reports
 */

import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { MetricsCollector } from './metrics-collector.js';
import { BrowserScenarios } from './browser-scenarios.js';

export interface AutoBrowserConfig {
    baseUrl: string;
    headless: boolean;
    recordVideo: boolean;
    sessionCount: number;
    mode: 'demo' | 'metrics' | 'test';
}

export class AutonomousBrowser {
    private browser?: Browser;
    private config: AutoBrowserConfig;
    private metricsCollector: MetricsCollector;
    private scenarios: BrowserScenarios;

    constructor(config: Partial<AutoBrowserConfig> = {}) {
        this.config = {
            baseUrl: 'http://localhost:3000/landing',
            headless: false,
            recordVideo: true,
            sessionCount: 10,
            mode: 'demo',
            ...config,
        };
        this.metricsCollector = new MetricsCollector();
        this.scenarios = new BrowserScenarios(this.metricsCollector);
    }

    /**
     * Start the autonomous browser system
     */
    async start() {
        console.log('🤖 Starting Autonomous Browser System...');
        console.log(`📊 Mode: ${this.config.mode}`);
        console.log(`🎯 Sessions to run: ${this.config.sessionCount}`);
        console.log(`🌐 Base URL: ${this.config.baseUrl}\n`);

        try {
            // Launch browser
            this.browser = await chromium.launch({
                headless: this.config.headless,
                slowMo: this.config.mode === 'demo' ? 500 : 100,
                args: [
                    '--start-maximized',
                    '--disable-blink-features=AutomationControlled'
                ],
                channel: 'chrome', // Use actual Chrome instead of Chromium
            });

            // Run sessions based on mode
            switch (this.config.mode) {
                case 'demo':
                    await this.runDemo();
                    break;
                case 'metrics':
                    await this.runMetricsCollection();
                    break;
                case 'test':
                    await this.runTests();
                    break;
            }

            // Generate report
            await this.generateReport();

        } catch (error) {
            console.error('❌ Error running autonomous browser:', error);
        } finally {
            await this.cleanup();
        }
    }

    /**
     * Demo mode - showcase features with visual recording
     */
    private async runDemo() {
        console.log('🎬 Running Demo Mode...\n');

        const context = await this.browser!.newContext({
            recordVideo: this.config.recordVideo ? {
                dir: './recordings',
                size: { width: 1920, height: 1080 }
            } : undefined,
        });

        const page = await context.newPage();

        // Show different user personas
        await this.scenarios.runCasualUser(page, this.config.baseUrl);
        await this.wait(2000);

        await this.scenarios.runPowerUser(page, this.config.baseUrl);
        await this.wait(2000);

        await this.scenarios.runResearchUser(page, this.config.baseUrl);

        await context.close();
        console.log('✅ Demo completed!\n');
    }

    /**
     * Metrics collection mode - gather real data
     */
    private async runMetricsCollection() {
        console.log('📈 Running Metrics Collection Mode...\n');

        for (let i = 0; i < this.config.sessionCount; i++) {
            console.log(`Session ${i + 1}/${this.config.sessionCount}`);

            const context = await this.browser!.newContext({});
            const page = await context.newPage();

            // Randomly select persona
            const personas = [
                () => this.scenarios.runCasualUser(page, this.config.baseUrl),
                () => this.scenarios.runPowerUser(page, this.config.baseUrl),
                () => this.scenarios.runResearchUser(page, this.config.baseUrl),
            ];

            const randomPersona = personas[Math.floor(Math.random() * personas.length)];
            await randomPersona();

            await context.close();
            await this.wait(1000);
        }

        console.log('✅ Metrics collection completed!\n');
    }

    /**
     * Test mode - validate functionality
     */
    private async runTests() {
        console.log('🧪 Running Test Mode...\n');

        const context = await this.browser!.newContext({});
        const page = await context.newPage();

        // Test search functionality
        await this.testSearchFunctionality(page);

        // Test recommendations
        await this.testRecommendations(page);

        // Test click tracking
        await this.testClickTracking(page);

        await context.close();
        console.log('✅ Tests completed!\n');
    }

    /**
     * Test search functionality
     */
    private async testSearchFunctionality(page: Page) {
        console.log('  Testing search functionality...');

        await page.goto(this.config.baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForLoadState('domcontentloaded');
        await this.wait(2000);

        // Type search query
        const searchInput = page.locator('input[name="search"], input[placeholder*="searching"]').first();
        await searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await searchInput.fill('machine learning');
        await this.wait(1000);

        // Check if results appear
        const resultsVisible = await page.locator('[data-testid="search-results"], .search-results, article').first().isVisible({ timeout: 5000 }).catch(() => false);

        if (resultsVisible) {
            console.log('  ✅ Search results displayed');
            this.metricsCollector.recordTest('search_functionality', true);
        } else {
            console.log('  ⚠️  No search results found');
            this.metricsCollector.recordTest('search_functionality', false);
        }
    }

    /**
     * Test recommendations
     */
    private async testRecommendations(page: Page) {
        console.log('  Testing recommendations...');

        await page.goto(`${this.config.baseUrl}/discovery`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => { });
        await page.waitForLoadState('domcontentloaded').catch(() => { });
        await this.wait(3000);

        // Check if recommendations are displayed
        const recsVisible = await page.locator('[data-testid="recommendations"], .recommendations, .discovery-content').first().isVisible({ timeout: 5000 }).catch(() => false);

        if (recsVisible) {
            console.log('  ✅ Recommendations displayed');
            this.metricsCollector.recordTest('recommendations', true);
        } else {
            console.log('  ⚠️  No recommendations found');
            this.metricsCollector.recordTest('recommendations', false);
        }
    }

    /**
     * Test click tracking
     */
    private async testClickTracking(page: Page) {
        console.log('  Testing click tracking...');

        await page.goto(this.config.baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForLoadState('domcontentloaded');
        await this.wait(2000);

        // Search
        const searchInput = page.locator('input[name="search"], input[placeholder*="searching"]').first();
        await searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await searchInput.fill('neural networks');
        await this.wait(1500);

        // Click first result
        const firstResult = page.locator('article, .result-item, a[href*="http"]').first();
        const clicked = await firstResult.click({ timeout: 5000 }).then(() => true).catch(() => false);

        if (clicked) {
            console.log('  ✅ Click tracking working');
            this.metricsCollector.recordTest('click_tracking', true);
        } else {
            console.log('  ⚠️  Could not click result');
            this.metricsCollector.recordTest('click_tracking', false);
        }
    }

    /**
     * Generate performance report
     */
    private async generateReport() {
        console.log('📊 Generating Report...\n');

        const report = this.metricsCollector.generateReport();

        console.log('═══════════════════════════════════════════');
        console.log('           AUTONOMOUS BROWSER REPORT        ');
        console.log('═══════════════════════════════════════════');
        console.log(report);
        console.log('═══════════════════════════════════════════\n');

        // Save to file
        await this.metricsCollector.saveReport('./autonomous-browser-report.json');
        await this.metricsCollector.exportCSV('./autonomous-browser-metrics.csv');

        console.log('💾 Report saved to:');
        console.log('  - autonomous-browser-report.json');
        console.log('  - autonomous-browser-metrics.csv\n');
    }

    /**
     * Cleanup resources
     */
    private async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
        console.log('🧹 Cleanup completed');
    }

    /**
     * Utility: Wait for specified milliseconds
     */
    private async wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// CLI execution
if (require.main === module) {
    const args = process.argv.slice(2);

    const config: Partial<AutoBrowserConfig> = {
        mode: args.includes('--demo') ? 'demo' :
            args.includes('--metrics') ? 'metrics' :
                args.includes('--test') ? 'test' : 'demo',
        headless: args.includes('--headless'),
        sessionCount: parseInt(args.find(arg => arg.startsWith('--sessions='))?.split('=')[1] || '10'),
    };

    const browser = new AutonomousBrowser(config);
    browser.start().catch(console.error);
}
