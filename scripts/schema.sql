-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS documents (
    doc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL UNIQUE,
    canonical_url TEXT,
    title TEXT NOT NULL,
    meta_description TEXT,
    body TEXT,
    body_length INTEGER,
    language VARCHAR(10) DEFAULT 'en',
    content_hash CHAR(64), -- SHA-256
    simhash BIGINT, -- For near-duplicate detection
    pagerank DOUBLE PRECISION DEFAULT 0.0,
    crawl_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_modified TIMESTAMP WITH TIME ZONE,
    index_status VARCHAR(20) DEFAULT 'pending', -- pending, indexed, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_url ON documents(url);
CREATE INDEX IF NOT EXISTS idx_documents_content_hash ON documents(content_hash);
CREATE INDEX IF NOT EXISTS idx_documents_pagerank ON documents(pagerank DESC);

-- Links table (From existing)
CREATE TABLE IF NOT EXISTS links (
    id BIGSERIAL PRIMARY KEY,
    source_doc_id UUID NOT NULL REFERENCES documents(doc_id) ON DELETE CASCADE,
    target_url TEXT NOT NULL,
    target_doc_id UUID REFERENCES documents(doc_id) ON DELETE SET NULL,
    anchor_text TEXT,
    link_type VARCHAR(20),
    position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_links_source ON links(source_doc_id);
CREATE INDEX IF NOT EXISTS idx_links_target_doc ON links(target_doc_id);

-- Search Events (Log queries - Replaces query_logs)
CREATE TABLE IF NOT EXISTS search_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    session_id UUID,
    query_text TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    result_count INTEGER,
    execution_time_ms INTEGER
);

CREATE INDEX IF NOT EXISTS idx_search_events_timestamp ON search_events(timestamp);

-- Click Events (New - Better than single click in query_logs)
CREATE TABLE IF NOT EXISTS click_events (
    click_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    search_event_id UUID REFERENCES search_events(event_id),
    doc_id UUID REFERENCES documents(doc_id),
    position INTEGER,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_click_events_timestamp ON click_events(timestamp);

-- Crawl Queue (From existing)
CREATE TABLE IF NOT EXISTS crawl_queue (
    id BIGSERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    priority INTEGER NOT NULL DEFAULT 5,
    depth INTEGER NOT NULL DEFAULT 0,
    referrer_url TEXT,
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    crawled_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending',
    retry_count INTEGER DEFAULT 0,
    last_error TEXT,
    metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_crawl_queue_status_priority ON crawl_queue(status, priority DESC);

-- Query Suggestions (From existing)
CREATE TABLE IF NOT EXISTS query_suggestions (
    id SERIAL PRIMARY KEY,
    query_text TEXT NOT NULL UNIQUE,
    frequency INTEGER DEFAULT 1,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_query_suggestions_text ON query_suggestions(query_text text_pattern_ops);
