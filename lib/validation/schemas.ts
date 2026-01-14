import { z } from 'zod';

/**
 * Validation schemas for API request validation
 * Using Zod for type-safe runtime validation
 */

// Search query validation
export const searchRequestSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, 'Query cannot be empty')
    .max(500, 'Query too long (max 500 characters)')
    .transform((val) => sanitizeQuery(val)),
  page: z
    .number()
    .int()
    .positive()
    .max(100, 'Page number too high')
    .default(1)
    .optional(),
  page_size: z
    .number()
    .int()
    .positive()
    .min(1)
    .max(100, 'Page size too large')
    .default(10)
    .optional(),
  filters: z
    .object({
      language: z.string().length(2).optional(),
      site: z.string().url().or(z.string().regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)).or(z.array(z.string())).optional(),
      dateRange: z
        .object({
          start: z.string().datetime().optional(),
          end: z.string().datetime().optional(),
        })
        .optional(),
    })
    .optional(),
  options: z
    .object({
      spell_correct: z.boolean().optional(),
      exact_match: z.boolean().optional(),
      safe_search: z.boolean().default(true).optional(),
    })
    .optional(),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;

// Suggestion query validation
export const suggestionRequestSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, 'Query must be at least 1 character')
    .max(200, 'Query too long')
    .transform((val) => sanitizeQuery(val)),
  limit: z.number().int().positive().max(20).default(10).optional(),
});

export type SuggestionRequest = z.infer<typeof suggestionRequestSchema>;

// Click event validation
export const clickEventSchema = z.object({
  search_event_id: z.string().uuid('Invalid search event ID'),
  doc_id: z.string().uuid('Invalid document ID'),
  position: z.number().int().positive().max(1000),
  url: z.string().url('Invalid URL'),
  query: z.string().max(500).optional(),
});

export type ClickEvent = z.infer<typeof clickEventSchema>;

// Admin crawl request validation
export const crawlRequestSchema = z.object({
  urls: z
    .array(z.string().url('Invalid URL'))
    .min(1, 'At least one URL required')
    .max(1000, 'Too many URLs (max 1000)'),
  priority: z.enum(['low', 'normal', 'high']).default('normal').optional(),
  respect_robots: z.boolean().default(true).optional(),
});

export type CrawlRequest = z.infer<typeof crawlRequestSchema>;

/**
 * Sanitizes search query to prevent injection attacks
 * Removes potentially dangerous characters while preserving search functionality
 */
function sanitizeQuery(query: string): string {
  // Remove null bytes
  let sanitized = query.replace(/\0/g, '');

  // Remove control characters except newline, carriage return, tab
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Limit consecutive spaces
  sanitized = sanitized.replace(/\s+/g, ' ');

  // Remove leading/trailing whitespace
  sanitized = sanitized.trim();

  // Remove potentially dangerous SQL patterns (defense in depth)
  const dangerousPatterns = [
    /;\s*(drop|delete|insert|update|create|alter|exec|execute|script)/gi,
    /--/g,
    /\/\*/g,
    /\*\//g,
  ];

  for (const pattern of dangerousPatterns) {
    sanitized = sanitized.replace(pattern, '');
  }

  return sanitized;
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Strips all HTML tags and converts special characters
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // Strip HTML tags
  let sanitized = html.replace(/<[^>]*>/g, '');

  // Encode special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized;
}

/**
 * Validates and sanitizes URLs
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }

    return parsed.toString();
  } catch {
    throw new Error('Invalid URL format');
  }
}

/**
 * Rate limit check result
 */
export interface RateLimitCheck {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  request_id: string;
  timestamp: string;
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: any,
  requestId?: string
): ErrorResponse {
  return {
    error: {
      code,
      message,
      details,
    },
    request_id: requestId || `req_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
  };
}
