import { safetyDetectionService } from '../lib/services/safety-detection-service';

/**
 * Test script for URL safety detection service
 * Tests various URLs with phishing patterns, malicious domains, and legitimate sites
 */

async function testSafetyDetection() {
    console.log('🔒 Testing URL Safety Detection Service\n');
    console.log('='.repeat(80));

    // Test cases
    const testUrls = [
        // Safe URLs
        'https://www.google.com',
        'https://github.com',
        'https://stackoverflow.com',
        'https://developer.mozilla.org',

        // Suspicious patterns
        'http://paypal-verify-account.com', // Contains phishing keywords, no HTTPS
        'https://192.168.1.1', // IP address
        'https://login.verify.secure.account.update.example.com', // Excessive subdomains
        'https://free-prize-winner.tk', // Suspicious TLD + phishing keywords
        'https://amaz0n-account-suspended.xyz', // Typosquatting + suspicious TLD

        // Very suspicious
        'http://192.168.0.1/banking/login', // IP + phishing keywords + no HTTPS
        'https://secure-bank-login123456.click', // Multiple red flags
    ];

    console.log(`\nTesting ${testUrls.length} URLs...\n`);

    for (const url of testUrls) {
        console.log(`\n${'─'.repeat(80)}`);
        console.log(`URL: ${url}`);
        console.log(`${'─'.repeat(80)}`);

        try {
            const result = await safetyDetectionService.checkUrl(url);

            // Display results
            console.log(`\n📊 Safety Analysis:`);
            console.log(`   Status: ${getStatusEmoji(result.safetyStatus)} ${result.safetyStatus.toUpperCase()}`);
            console.log(`   Safety Score: ${result.safetyScore}/100`);
            console.log(`   Confidence: ${result.confidenceScore}%`);
            console.log(`   HTTPS: ${result.isHttps ? '✅' : '❌'}`);
            console.log(`   Method: ${result.checkMethod}`);

            if (result.threatTypes.length > 0) {
                console.log(`\n⚠️  Detected Threats:`);
                result.threatTypes.forEach(threat => {
                    console.log(`   - ${threat.toUpperCase()}`);
                });
            }

            console.log(`\n🔍 Checks Performed:`);
            console.log(`   Suspicious Patterns: ${result.checks.hasSuspiciousPatterns ? '⚠️  YES' : '✅ NO'}`);
            console.log(`   Phishing Keywords: ${result.checks.hasPhishingKeywords ? '⚠️  YES' : '✅ NO'}`);
            console.log(`   IP Address: ${result.checks.isIpAddress ? '⚠️  YES' : '✅ NO'}`);
            console.log(`   Suspicious TLD: ${result.checks.suspiciousTld ? '⚠️  YES' : '✅ NO'}`);
            console.log(`   Excessive Subdomains: ${result.checks.excessiveSubdomain ? '⚠️  YES' : '✅ NO'}`);

        } catch (error) {
            console.error(`❌ Error checking URL: ${error}`);
        }
    }

    console.log(`\n${'='.repeat(80)}`);
    console.log('\n✅ Safety detection testing complete!\n');
    process.exit(0);
}

function getStatusEmoji(status: string): string {
    switch (status) {
        case 'safe': return '✅';
        case 'warning': return '⚠️ ';
        case 'danger': return '🚫';
        default: return '❓';
    }
}

// Run tests
testSafetyDetection().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
