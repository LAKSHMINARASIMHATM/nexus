# Indexing System Architecture

## Overview
The indexing system transforms processed documents into a searchable inverted index with term-based sharding for horizontal scalability.

## Inverted Index Structure

### Core Data Structures

\`\`\`
Inverted Index:
term -> PostingsList

PostingsList:
  [
    (doc_id, term_frequency, [positions...], field_flags),
    (doc_id, term_frequency, [positions...], field_flags),
    ...
  ]

Document Store:
doc_id -> {
  url: string
  title: string
  meta_description: string
  body_length: int
  pagerank: float
  language: string
  crawl_timestamp: timestamp
  content_hash: string
}

Positions Index:
(term, doc_id) -> [pos1, pos2, pos3, ...]  // For phrase queries
\`\`\`

### Field Flags
\`\`\`
Bit 0: Title
Bit 1: Body
Bit 2: Anchor text
Bit 3: URL
Bit 4: Meta description
Bit 5: Headings (h1-h6)
\`\`\`

Example:
\`\`\`
field_flags = 0b000101 = Title (bit 0) + Meta (bit 4)
\`\`\`

## Sharding Strategy

### Term-Based Sharding

\`\`\`
shard_id = hash(term) % num_shards
\`\`\`

**Benefits:**
- Even distribution of terms across shards
- Parallel query processing
- Independent shard scaling

**Shard Configuration:**
\`\`\`
Total Shards: 64
Replication Factor: 3
Shard Size Target: 50GB per shard
Total Index Size: ~3.2TB (64 shards × 50GB)
\`\`\`

### Shard Distribution

\`\`\`
┌────────────────────────────────────────────────────────────┐
│                    Elasticsearch Cluster                    │
│                                                             │
│  Node 1            Node 2            Node 3                 │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐            │
│  │ Shard 0  │     │ Shard 1  │     │ Shard 2  │            │
│  │(Primary) │     │(Primary) │     │(Primary) │            │
│  ├──────────┤     ├──────────┤     ├──────────┤            │
│  │ Shard 1  │     │ Shard 2  │     │ Shard 0  │            │
│  │(Replica) │     │(Replica) │     │(Replica) │            │
│  ├──────────┤     ├──────────┤     ├──────────┤            │
│  │ Shard 2  │     │ Shard 0  │     │ Shard 1  │            │
│  │(Replica) │     │(Replica) │     │(Replica) │            │
│  └──────────┘     └──────────┘     └──────────┘            │
│                                                             │
│  ... (21 nodes total for 64 shards with 3x replication)    │
└────────────────────────────────────────────────────────────┘
\`\`\`

## Indexing Pipeline

\`\`\`
Document → Tokenizer → Stemmer → Stop Word Filter → Indexer
                                                        │
                                                        ▼
                                            ┌──────────────────┐
                                            │  Term Dictionary │
                                            └─────────┬────────┘
                                                      │
                                                      ▼
                                            ┌──────────────────┐
                                            │ Postings Lists   │
                                            └──────────────────┘
\`\`\`

### Indexer Implementation

\`\`\`typescript
// Node.js Indexer Service

interface Document {
  doc_id: string;
  url: string;
  title: string;
  body: string;
  meta_description: string;
  anchor_texts: string[];
  language: string;
  crawl_timestamp: Date;
}

interface TermPosting {
  doc_id: string;
  tf: number;
  positions: number[];
  field_flags: number;
}

class Indexer {
  private esClient: Client;
  private tokenizer: Tokenizer;
  private stemmer: Stemmer;
  
  async indexDocument(doc: Document): Promise<void> {
    // Tokenize and process fields
    const titleTerms = this.processField(doc.title, FIELD_TITLE);
    const bodyTerms = this.processField(doc.body, FIELD_BODY);
    const anchorTerms = this.processField(
      doc.anchor_texts.join(' '), 
      FIELD_ANCHOR
    );
    
    // Combine all terms
    const allTerms = [...titleTerms, ...bodyTerms, ...anchorTerms];
    
    // Build posting for each term
    const postings = this.buildPostings(allTerms, doc.doc_id);
    
    // Calculate document length for BM25
    const docLength = bodyTerms.length;
    
    // Index in Elasticsearch
    await this.esClient.index({
      index: 'search_index',
      id: doc.doc_id,
      body: {
        url: doc.url,
        title: doc.title,
        meta_description: doc.meta_description,
        doc_length: docLength,
        language: doc.language,
        crawl_timestamp: doc.crawl_timestamp,
        postings: postings
      }
    });
  }
  
  private processField(text: string, fieldFlag: number): ProcessedTerm[] {
    // Tokenize
    const tokens = this.tokenizer.tokenize(text);
    
    // Remove stop words
    const filtered = tokens.filter(t => !STOP_WORDS.has(t));
    
    // Stem
    const stemmed = filtered.map(t => this.stemmer.stem(t));
    
    // Track positions
    return stemmed.map((term, position) => ({
      term,
      position,
      fieldFlag
    }));
  }
  
  private buildPostings(
    terms: ProcessedTerm[], 
    docId: string
  ): Map<string, TermPosting> {
    const postings = new Map<string, TermPosting>();
    
    for (const { term, position, fieldFlag } of terms) {
      if (!postings.has(term)) {
        postings.set(term, {
          doc_id: docId,
          tf: 0,
          positions: [],
          field_flags: 0
        });
      }
      
      const posting = postings.get(term)!;
      posting.tf++;
      posting.positions.push(position);
      posting.field_flags |= fieldFlag;
    }
    
    return postings;
  }
}
\`\`\`

## Index Compression

### Variable-Byte Encoding

\`\`\`go
// Compress posting IDs with delta encoding
func CompressPostings(docIDs []uint32) []byte {
    var compressed []byte
    prev := uint32(0)
    
    for _, docID := range docIDs {
        delta := docID - prev
        compressed = append(compressed, vbEncodeUint32(delta)...)
        prev = docID
    }
    
    return compressed
}

func vbEncodeUint32(n uint32) []byte {
    var bytes []byte
    for {
        bytes = append(bytes, byte(n%128))
        if n < 128 {
            break
        }
        n /= 128
    }
    // Set continuation bit on all but last byte
    for i := 0; i < len(bytes)-1; i++ {
        bytes[i] |= 128
    }
    return bytes
}
\`\`\`

**Compression Ratios:**
- Posting lists: ~5:1 compression
- Positions: ~4:1 compression
- Total index size reduction: ~60%

## Elasticsearch Index Mapping

\`\`\`json
{
  "mappings": {
    "properties": {
      "url": {
        "type": "keyword"
      },
      "title": {
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      "body": {
        "type": "text",
        "analyzer": "standard",
        "term_vector": "with_positions_offsets"
      },
      "meta_description": {
        "type": "text"
      },
      "doc_length": {
        "type": "integer"
      },
      "pagerank": {
        "type": "float"
      },
      "language": {
        "type": "keyword"
      },
      "crawl_timestamp": {
        "type": "date"
      },
      "content_hash": {
        "type": "keyword"
      }
    }
  },
  "settings": {
    "number_of_shards": 64,
    "number_of_replicas": 2,
    "refresh_interval": "30s",
    "index": {
      "codec": "best_compression"
    }
  }
}
\`\`\`

## Index Update Strategies

### Incremental Updates

\`\`\`
New documents → Staging Index → Merge → Primary Index (daily)
\`\`\`

**Process:**
1. New documents indexed to staging index
2. Daily merge operation combines staging into primary
3. Old segments compacted during merge

### Near Real-Time (NRT) Updates

\`\`\`
High-priority documents → Primary Index (immediate)
\`\`\`

**Configuration:**
\`\`\`json
{
  "refresh_interval": "5s"  // For high-priority tier
}
\`\`\`

## Index Maintenance

### Segment Merging
\`\`\`bash
# Force merge to reduce segment count
curl -XPOST "localhost:9200/search_index/_forcemerge?max_num_segments=1"
\`\`\`

### Reindexing Strategy
\`\`\`
1. Create new index with updated mapping
2. Reindex from old → new (background)
3. Use alias to switch traffic atomically
4. Delete old index after verification
\`\`\`

## Monitoring Metrics

\`\`\`
- index.size_bytes
- index.doc_count
- index.segments_count
- index.merges_total_time_ms
- index.indexing_rate (docs/sec)
- index.indexing_latency_ms
- index.refresh_time_ms
- index.search_query_total
- index.search_query_time_ms
