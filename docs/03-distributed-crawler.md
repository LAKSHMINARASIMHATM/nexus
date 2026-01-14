# Distributed Crawler Architecture

## Overview
The crawler fleet consists of 1,000+ distributed workers that discover, fetch, and process web pages at scale while respecting web standards and politeness policies.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                      Crawl Coordinator                           │
│  • Priority Management  • Rate Limiting  • Worker Assignment     │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       URL Frontier                               │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐    │
│  │ Priority Queue │  │ Priority Queue │  │ Priority Queue │    │
│  │   (Tier 1)     │  │   (Tier 2)     │  │   (Tier 3)     │    │
│  │  News sites    │  │  Popular sites │  │  Long-tail     │    │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘    │
│          │                   │                    │             │
└──────────┼───────────────────┼────────────────────┼─────────────┘
           │                   │                    │
           └───────────────────┴────────────────────┘
                               │
           ┌───────────────────┴───────────────────┐
           │                                       │
           ▼                                       ▼
┌──────────────────────┐              ┌──────────────────────┐
│   Worker Pool 1      │              │   Worker Pool N      │
│  ┌────────────────┐  │              │  ┌────────────────┐  │
│  │  Worker  1:1   │  │              │  │  Worker N:1    │  │
│  └────────────────┘  │              │  └────────────────┘  │
│  ┌────────────────┐  │              │  ┌────────────────┐  │
│  │  Worker  1:2   │  │     ...      │  │  Worker N:M    │  │
│  └────────────────┘  │              │  └────────────────┘  │
└──────────┬───────────┘              └──────────┬───────────┘
           │                                     │
           └─────────────────┬───────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Politeness Layer                             │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  robots.txt      │  │   Host Rate      │  │  URL Bloom   │  │
│  │     Cache        │  │   Limiter        │  │   Filter     │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Fetcher                                   │
│  • HTTP/2 Support  • Compression  • Timeout Handling            │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Content Processing                              │
│                                                                  │
│  Raw HTML → Parser → Link Extractor → Content Hash → Queue      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Key Components

### 1. Crawl Coordinator
**Responsibilities:**
- Manage URL frontier with multiple priority tiers
- Assign work to available workers
- Monitor crawler health and redistribute load
- Implement global rate limiting policies

**Implementation (Go):**
\`\`\`go
type CrawlCoordinator struct {
    frontier    *URLFrontier
    workers     []*WorkerPool
    rateLimiter *RateLimiter
    metrics     *MetricsCollector
}

func (cc *CrawlCoordinator) AssignWork(ctx context.Context) {
    for {
        url := cc.frontier.Pop()
        if url == nil {
            time.Sleep(100 * time.Millisecond)
            continue
        }
        
        // Check global rate limit
        if !cc.rateLimiter.Allow(url.Host) {
            cc.frontier.PushBack(url)
            continue
        }
        
        // Assign to available worker
        worker := cc.getAvailableWorker()
        worker.Crawl(url)
    }
}
\`\`\`

### 2. URL Frontier (Priority Queue)

**Priority Tiers:**
- **Tier 1 (High)**: News sites, frequently updated content (recrawl: hourly)
- **Tier 2 (Medium)**: Popular sites, e-commerce (recrawl: daily)
- **Tier 3 (Low)**: Long-tail content (recrawl: weekly)

**Priority Score:**
\`\`\`
priority = (pagerank_score * 0.4) + 
           (update_frequency * 0.3) + 
           (crawl_age * 0.2) + 
           (link_depth * 0.1)
\`\`\`

**Data Structure:**
\`\`\`go
type URLFrontier struct {
    highPriority   *heap.Heap     // Priority queue
    mediumPriority *heap.Heap
    lowPriority    *heap.Heap
    seen           *BloomFilter   // URL deduplication
    hostQueues     map[string]*Queue // Per-host queues
}

type URLItem struct {
    URL           string
    Priority      float64
    Depth         int
    LastCrawled   time.Time
    ReferrerCount int
}
\`\`\`

### 3. Worker Implementation

\`\`\`go
type CrawlerWorker struct {
    id            string
    fetcher       *HTTPFetcher
    parser        *HTMLParser
    rateLimiter   *HostRateLimiter
    robotsCache   *RobotsCache
}

func (w *CrawlerWorker) Crawl(url *URLItem) error {
    // Check robots.txt
    allowed, err := w.robotsCache.IsAllowed(url.URL, "SearchBot")
    if err != nil || !allowed {
        return fmt.Errorf("robots.txt disallows: %w", err)
    }
    
    // Rate limiting per host
    w.rateLimiter.Wait(url.Host())
    
    // Fetch content
    resp, err := w.fetcher.Fetch(url.URL)
    if err != nil {
        return fmt.Errorf("fetch failed: %w", err)
    }
    defer resp.Body.Close()
    
    // Parse HTML
    doc, err := w.parser.Parse(resp.Body)
    if err != nil {
        return fmt.Errorf("parse failed: %w", err)
    }
    
    // Extract links
    links := w.parser.ExtractLinks(doc, url.URL)
    
    // Send to processing pipeline
    w.sendToProcessing(doc, links, url)
    
    return nil
}
\`\`\`

### 4. Politeness Policies

**robots.txt Compliance:**
\`\`\`go
type RobotsCache struct {
    cache sync.Map // host -> *RobotsTxt
    ttl   time.Duration
}

type RobotsTxt struct {
    Rules      []Rule
    Sitemap    []string
    CrawlDelay time.Duration
    FetchedAt  time.Time
}

func (rc *RobotsCache) IsAllowed(url, userAgent string) (bool, error) {
    host := extractHost(url)
    
    // Check cache
    if cached, ok := rc.cache.Load(host); ok {
        robots := cached.(*RobotsTxt)
        if time.Since(robots.FetchedAt) < rc.ttl {
            return robots.IsAllowed(url, userAgent), nil
        }
    }
    
    // Fetch robots.txt
    robots, err := rc.fetch(host)
    if err != nil {
        return false, err
    }
    
    rc.cache.Store(host, robots)
    return robots.IsAllowed(url, userAgent), nil
}
\`\`\`

**Host Rate Limiting:**
- Minimum 1 second between requests to same host
- Respect `Crawl-delay` directive in robots.txt
- Exponential backoff on errors (429, 503)

\`\`\`go
type HostRateLimiter struct {
    limiters sync.Map // host -> *rate.Limiter
}

func (hrl *HostRateLimiter) Wait(host string) {
    limiter := hrl.getLimiter(host)
    limiter.Wait(context.Background())
}

func (hrl *HostRateLimiter) getLimiter(host string) *rate.Limiter {
    if limiter, ok := hrl.limiters.Load(host); ok {
        return limiter.(*rate.Limiter)
    }
    
    // Default: 1 request per second
    limiter := rate.NewLimiter(rate.Every(time.Second), 1)
    hrl.limiters.Store(host, limiter)
    return limiter
}
\`\`\`

### 5. URL Deduplication

**Bloom Filter:**
- 10M URLs → 100MB memory (1% false positive rate)
- Periodic flush to persistent storage

\`\`\`go
type URLDeduplicator struct {
    bloom  *bloom.BloomFilter
    exact  *leveldb.DB  // Persistent exact check
}

func (ud *URLDeduplicator) IsSeen(url string) bool {
    // Quick check with bloom filter
    if !ud.bloom.Test([]byte(url)) {
        ud.bloom.Add([]byte(url))
        return false
    }
    
    // Exact check in database
    _, err := ud.exact.Get([]byte(url), nil)
    if err == leveldb.ErrNotFound {
        ud.exact.Put([]byte(url), []byte{1}, nil)
        return false
    }
    
    return true
}
\`\`\`

### 6. Content Hashing (Near-Duplicate Detection)

**SimHash Algorithm:**
\`\`\`go
func ComputeSimHash(text string) uint64 {
    tokens := tokenize(text)
    features := extractFeatures(tokens)
    
    var hash uint64
    for _, feature := range features {
        featureHash := hashFeature(feature)
        for i := 0; i < 64; i++ {
            bit := (featureHash >> i) & 1
            if bit == 1 {
                hash |= (1 << i)
            }
        }
    }
    
    return hash
}

func AreNearDuplicates(hash1, hash2 uint64) bool {
    xor := hash1 ^ hash2
    hammingDistance := bits.OnesCount64(xor)
    return hammingDistance < 3  // <3 bits different = near-duplicate
}
\`\`\`

## Configuration

\`\`\`yaml
crawler:
  workers:
    count: 1000
    concurrency_per_worker: 10
  
  rate_limiting:
    default_delay: 1s
    respect_crawl_delay: true
    max_concurrent_per_host: 1
  
  timeouts:
    connection: 10s
    read: 30s
    total: 60s
  
  retries:
    max_attempts: 3
    backoff_multiplier: 2
  
  user_agent: "SearchBot/1.0 (+https://example.com/bot)"
  
  frontier:
    high_priority_quota: 40%
    medium_priority_quota: 40%
    low_priority_quota: 20%
  
  deduplication:
    bloom_filter_size: 100000000  # 100M URLs
    false_positive_rate: 0.01
\`\`\`

## Monitoring & Metrics

\`\`\`
- crawler.urls.queued
- crawler.urls.crawled
- crawler.urls.failed
- crawler.bandwidth.bytes_downloaded
- crawler.latency.p50/p95/p99
- crawler.robots_cache.hit_rate
- crawler.bloom_filter.false_positives
- crawler.workers.active
- crawler.workers.idle
