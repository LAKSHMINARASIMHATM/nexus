import pool from '../db';
import crypto from 'crypto';

// Enums and Types
export enum SafetyStatus {
    SAFE = 'safe',
    WARNING = 'warning',
    DANGER = 'danger',
    UNKNOWN = 'unknown'
}

export enum ThreatType {
    PHISHING = 'phishing',
    MALWARE = 'malware',
    SUSPICIOUS = 'suspicious',
    SPAM = 'spam',
    DECEPTIVE = 'deceptive'
}

export interface SafetyCheckResult {
    url: string;
    safetyStatus: SafetyStatus;
    threatTypes: ThreatType[];
    safetyScore: number; // 0-100
    confidenceScore: number; // 0-100
    isHttps: boolean;
    checks: {
        hasSuspiciousPatterns: boolean;
        hasPhishingKeywords: boolean;
        isIpAddress: boolean;
        suspiciousTld: boolean;
        excessiveSubdomain: boolean;
    };
    checkMethod: string;
    details: any;
    checkedAt: Date;
}

export class SafetyDetectionService {
    private readonly CACHE_DURATION_HOURS = 24;

    // Known suspicious TLDs commonly used in phishing
    private readonly SUSPICIOUS_TLDS = [
        '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.club', '.work',
        '.click', '.link', '.download', '.racing', '.review', '.stream',
        '.loan', '.trade', '.win', '.bid', '.accountant', '.science'
    ];

    // Phishing keywords commonly found in URLs
    private readonly PHISHING_KEYWORDS = [
        'verify', 'account', 'suspended', 'locked', 'secure', 'update',
        'confirm', 'login', 'signin', 'banking', 'paypal', 'ebay',
        'amazon', 'apple', 'microsoft', 'secure', 'wallet', 'blockchain',
        'prize', 'winner', 'claim', 'free', 'urgent', 'expired',
        'suspend', 'unusual', 'activity', 'notification', 'alert'
    ];

    // Suspicious URL patterns
    private readonly SUSPICIOUS_PATTERNS = [
        /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP address
        /-{2,}/, // Multiple consecutive hyphens
        /[0-9]{5,}/, // Long number sequences
        /@/, // @ symbol in URL
        /([a-z0-9-]+\.){4,}/, // Excessive subdomains (4+)
    ];

    /**
     * Check URL safety (with caching)
     */
    async checkUrl(url: string): Promise<SafetyCheckResult> {
        const normalizedUrl = this.normalizeUrl(url);
        const urlHash = this.hashUrl(normalizedUrl);

        // Check cache first
        const cached = await this.getCachedResult(urlHash);
        if (cached) {
            return cached;
        }

        // Perform new safety check
        const result = await this.performSafetyCheck(normalizedUrl);

        // Cache the result
        await this.cacheResult(normalizedUrl, urlHash, result);

        return result;
    }

    /**
     * Check multiple URLs in batch
     */
    async checkUrls(urls: string[]): Promise<SafetyCheckResult[]> {
        const results = await Promise.all(
            urls.map(url => this.checkUrl(url))
        );
        return results;
    }

    /**
     * Perform heuristic-based safety check
     */
    private async performSafetyCheck(url: string): Promise<SafetyCheckResult> {
        const checks = {
            hasSuspiciousPatterns: this.hasSuspiciousPatterns(url),
            hasPhishingKeywords: this.hasPhishingKeywords(url),
            isIpAddress: this.isIpAddress(url),
            suspiciousTld: this.hasSuspiciousTld(url),
            excessiveSubdomain: this.hasExcessiveSubdomains(url),
        };

        const isHttps = url.startsWith('https://');

        // Check against known malicious domains
        const isKnownMalicious = await this.checkKnownMaliciousDomains(url);

        // Calculate threat types
        const threatTypes: ThreatType[] = [];
        if (isKnownMalicious) {
            threatTypes.push(ThreatType.MALWARE, ThreatType.PHISHING);
        }
        if (checks.hasPhishingKeywords || checks.hasSuspiciousPatterns) {
            threatTypes.push(ThreatType.PHISHING);
        }
        if (checks.suspiciousTld || checks.excessiveSubdomain || checks.isIpAddress) {
            threatTypes.push(ThreatType.SUSPICIOUS);
        }

        // Calculate safety score (0-100, higher is safer)
        let safetyScore = 100;

        if (isKnownMalicious) safetyScore -= 100; // Immediate zero
        if (!isHttps) safetyScore -= 10;
        if (checks.isIpAddress) safetyScore -= 30;
        if (checks.suspiciousTld) safetyScore -= 25;
        if (checks.excessiveSubdomain) safetyScore -= 20;
        if (checks.hasPhishingKeywords) safetyScore -= 20;
        if (checks.hasSuspiciousPatterns) safetyScore -= 15;

        safetyScore = Math.max(0, safetyScore);

        // Determine safety status
        let safetyStatus: SafetyStatus;
        if (safetyScore >= 80) {
            safetyStatus = SafetyStatus.SAFE;
        } else if (safetyScore >= 50) {
            safetyStatus = SafetyStatus.WARNING;
        } else if (safetyScore >= 0) {
            safetyStatus = SafetyStatus.DANGER;
        } else {
            safetyStatus = SafetyStatus.UNKNOWN;
        }

        // Calculate confidence score
        const confidenceScore = this.calculateConfidence(checks, isKnownMalicious);

        return {
            url,
            safetyStatus,
            threatTypes,
            safetyScore,
            confidenceScore,
            isHttps,
            checks,
            checkMethod: 'heuristic',
            details: {
                knownMalicious: isKnownMalicious,
                checksPerformed: Object.keys(checks).length,
            },
            checkedAt: new Date(),
        };
    }

    /**
     * Check if URL matches suspicious patterns
     */
    private hasSuspiciousPatterns(url: string): boolean {
        return this.SUSPICIOUS_PATTERNS.some(pattern => pattern.test(url));
    }

    /**
     * Check if URL contains phishing keywords
     */
    private hasPhishingKeywords(url: string): boolean {
        const lowerUrl = url.toLowerCase();
        return this.PHISHING_KEYWORDS.some(keyword => lowerUrl.includes(keyword));
    }

    /**
     * Check if URL uses an IP address instead of domain
     */
    private isIpAddress(url: string): boolean {
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname;
            return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);
        } catch {
            return false;
        }
    }

    /**
     * Check if URL uses a suspicious TLD
     */
    private hasSuspiciousTld(url: string): boolean {
        const lowerUrl = url.toLowerCase();
        return this.SUSPICIOUS_TLDS.some(tld => lowerUrl.endsWith(tld));
    }

    /**
     * Check if URL has excessive subdomains (potential typosquatting)
     */
    private hasExcessiveSubdomains(url: string): boolean {
        try {
            const urlObj = new URL(url);
            const parts = urlObj.hostname.split('.');
            return parts.length > 4; // More than 4 parts is suspicious
        } catch {
            return false;
        }
    }

    /**
     * Check against known malicious domains database
     */
    private async checkKnownMaliciousDomains(url: string): Promise<boolean> {
        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname;

            const sql = `
                SELECT COUNT(*) as count
                FROM known_malicious_domains
                WHERE domain = $1 AND is_active = true
            `;

            const result = await pool.query(sql, [domain]);
            return result.rows[0]?.count > 0;
        } catch (error) {
            console.error('Error checking malicious domains:', error);
            return false;
        }
    }

    /**
     * Calculate confidence score
     */
    private calculateConfidence(checks: any, isKnownMalicious: boolean): number {
        let confidence = 50; // Base confidence

        // High confidence if known malicious
        if (isKnownMalicious) return 95;

        // Increase confidence for each check performed
        const checksPassed = Object.values(checks).filter(Boolean).length;
        confidence += checksPassed * 5;

        // Cap confidence
        return Math.min(95, confidence);
    }

    /**
     * Get cached safety check result
     */
    private async getCachedResult(urlHash: string): Promise<SafetyCheckResult | null> {
        try {
            const sql = `
                SELECT *
                FROM url_safety_checks
                WHERE url_hash = $1
                AND (expires_at IS NULL OR expires_at > NOW())
                ORDER BY last_checked_at DESC
                LIMIT 1
            `;

            const result = await pool.query(sql, [urlHash]);

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];
            return {
                url: row.url,
                safetyStatus: row.safety_status as SafetyStatus,
                threatTypes: row.threat_types || [],
                safetyScore: row.safety_score,
                confidenceScore: row.confidence_score,
                isHttps: row.is_https,
                checks: {
                    hasSuspiciousPatterns: row.has_suspicious_patterns,
                    hasPhishingKeywords: row.has_phishing_keywords,
                    isIpAddress: row.is_ip_address,
                    suspiciousTld: row.suspicious_tld,
                    excessiveSubdomain: row.excessive_subdomain,
                },
                checkMethod: row.check_method,
                details: row.details,
                checkedAt: row.last_checked_at,
            };
        } catch (error) {
            console.error('Error getting cached result:', error);
            return null;
        }
    }

    /**
     * Cache safety check result
     */
    private async cacheResult(url: string, urlHash: string, result: SafetyCheckResult): Promise<void> {
        try {
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + this.CACHE_DURATION_HOURS);

            const sql = `
                INSERT INTO url_safety_checks (
                    url, url_hash, safety_status, threat_types, safety_score, 
                    confidence_score, is_https, has_suspicious_patterns,
                    has_phishing_keywords, is_ip_address, suspicious_tld,
                    excessive_subdomain, check_method, details, expires_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                ON CONFLICT (url_hash) DO UPDATE SET
                    safety_status = EXCLUDED.safety_status,
                    threat_types = EXCLUDED.threat_types,
                    safety_score = EXCLUDED.safety_score,
                    confidence_score = EXCLUDED.confidence_score,
                    last_checked_at = NOW(),
                    expires_at = EXCLUDED.expires_at,
                    updated_at = NOW()
            `;

            await pool.query(sql, [
                url,
                urlHash,
                result.safetyStatus,
                result.threatTypes,
                result.safetyScore,
                result.confidenceScore,
                result.isHttps,
                result.checks.hasSuspiciousPatterns,
                result.checks.hasPhishingKeywords,
                result.checks.isIpAddress,
                result.checks.suspiciousTld,
                result.checks.excessiveSubdomain,
                result.checkMethod,
                JSON.stringify(result.details),
                expiresAt,
            ]);
        } catch (error) {
            console.error('Error caching result:', error);
            // Don't throw - caching failure shouldn't break functionality
        }
    }

    /**
     * Normalize URL for consistent hashing
     */
    private normalizeUrl(url: string): string {
        try {
            const urlObj = new URL(url);
            // Normalize: lowercase hostname, remove trailing slash, sort query params
            urlObj.hostname = urlObj.hostname.toLowerCase();
            urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
            return urlObj.toString();
        } catch {
            return url.toLowerCase().trim();
        }
    }

    /**
     * Generate SHA-256 hash of URL
     */
    private hashUrl(url: string): string {
        return crypto.createHash('sha256').update(url).digest('hex');
    }

    /**
     * Report a safety issue (false positive/negative)
     */
    async reportSafety(params: {
        url: string;
        reportType: 'false_positive' | 'false_negative' | 'new_threat';
        currentStatus: SafetyStatus;
        userClaimedStatus: SafetyStatus;
        description?: string;
        userId?: string;
        sessionId?: string;
    }): Promise<string> {
        const sql = `
            INSERT INTO safety_reports (
                url, report_type, current_status, user_claimed_status,
                description, reported_by_user_id, reported_by_session_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        const result = await pool.query(sql, [
            params.url,
            params.reportType,
            params.currentStatus,
            params.userClaimedStatus,
            params.description || null,
            params.userId || null,
            params.sessionId || null,
        ]);

        return result.rows[0].id;
    }
}

export const safetyDetectionService = new SafetyDetectionService();
