import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse, RateLimitCheck } from '../validation/schemas';

/**
 * Rate Limiting Middleware
 * Implements sliding window rate limiting with in-memory store
 * For production, integrate with Redis for distributed rate limiting
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: NextRequest) => string; // Custom key generator
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
}

interface RequestRecord {
  timestamps: number[];
  blockedUntil?: number;
}

class RateLimiter {
  private store: Map<string, RequestRecord> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup old entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Check if request is allowed under rate limit
   */
  check(key: string, config: RateLimitConfig): RateLimitCheck {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Get or create record
    let record = this.store.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.store.set(key, record);
    }

    // Check if currently blocked
    if (record.blockedUntil && record.blockedUntil > now) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(record.blockedUntil),
      };
    }

    // Remove timestamps outside the window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    // Check if limit exceeded
    if (record.timestamps.length >= config.maxRequests) {
      // Block for remaining window time
      const oldestTimestamp = Math.min(...record.timestamps);
      const resetAt = oldestTimestamp + config.windowMs;
      record.blockedUntil = resetAt;

      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(resetAt),
      };
    }

    // Add current request
    record.timestamps.push(now);

    return {
      allowed: true,
      remaining: config.maxRequests - record.timestamps.length,
      resetAt: new Date(now + config.windowMs),
    };
  }

  /**
   * Cleanup old entries from store
   */
  private cleanup() {
    const now = Date.now();
    const maxAge = 3600000; // 1 hour

    for (const [key, record] of this.store.entries()) {
      // Remove if no recent activity and not blocked
      if (
        (!record.blockedUntil || record.blockedUntil < now) &&
        record.timestamps.length === 0
      ) {
        this.store.delete(key);
        continue;
      }

      // Remove if last activity was over max age
      if (record.timestamps.length > 0) {
        const lastTimestamp = Math.max(...record.timestamps);
        if (now - lastTimestamp > maxAge) {
          this.store.delete(key);
        }
      }
    }
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string) {
    this.store.delete(key);
  }

  /**
   * Shutdown cleanup interval
   */
  destroy() {
    clearInterval(this.cleanupInterval);
  }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter();

/**
 * Default rate limit configurations for different endpoints
 */
export const rateLimitConfigs = {
  // Search API: 60 requests per minute per IP
  search: {
    windowMs: 60 * 1000,
    maxRequests: 60,
  },
  // Suggestions API: 120 requests per minute per IP (more lenient for autocomplete)
  suggest: {
    windowMs: 60 * 1000,
    maxRequests: 120,
  },
  // Admin APIs: 10 requests per minute per IP
  admin: {
    windowMs: 60 * 1000,
    maxRequests: 10,
  },
  // Click tracking: 100 requests per minute per IP
  click: {
    windowMs: 60 * 1000,
    maxRequests: 100,
  },
};

/**
 * Get client identifier from request
 * Uses IP address, falling back to user-agent if IP unavailable
 */
function getClientKey(req: NextRequest, prefix: string = 'rl'): string {
  // Get IP address
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || req.ip || 'unknown';

  // Include user agent for better uniqueness
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const userAgentHash = simpleHash(userAgent);

  return `${prefix}:${ip}:${userAgentHash}`;
}

/**
 * Simple hash function for strings
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Rate limit middleware factory
 * Creates middleware function with specified configuration
 */
export function createRateLimitMiddleware(config: RateLimitConfig) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    // Generate rate limit key
    const key = config.keyGenerator?.(req) || getClientKey(req);

    // Check rate limit
    const result = rateLimiter.check(key, config);

    // Add rate limit headers
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', result.resetAt.toISOString());

    // If rate limit exceeded, return 429
    if (!result.allowed) {
      const retryAfter = Math.ceil((result.resetAt.getTime() - Date.now()) / 1000);
      headers.set('Retry-After', retryAfter.toString());

      return NextResponse.json(
        createErrorResponse(
          'RATE_LIMIT_EXCEEDED',
          'Too many requests. Please try again later.',
          {
            limit: config.maxRequests,
            window_ms: config.windowMs,
            retry_after_seconds: retryAfter,
          }
        ),
        {
          status: 429,
          headers,
        }
      );
    }

    return null; // Allow request to proceed
  };
}

/**
 * Apply rate limiting to a handler function
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const rateLimitMiddleware = createRateLimitMiddleware(config);
    const rateLimitResponse = await rateLimitMiddleware(req);

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    return handler(req);
  };
}

/**
 * Session-based rate limiting (in addition to IP-based)
 * More lenient limits for authenticated users
 */
export function getSessionKey(req: NextRequest): string {
  const sessionId = req.headers.get('x-session-id');
  const userId = req.headers.get('x-user-id');

  if (userId) {
    return `rl:user:${userId}`;
  } else if (sessionId) {
    return `rl:session:${sessionId}`;
  } else {
    return getClientKey(req);
  }
}

/**
 * Export rate limiter for testing
 */
export { rateLimiter };
