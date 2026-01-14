import { Client } from "@elastic/elasticsearch"
import { BM25Scorer } from "./bm25-scorer"
import { MLReranker } from "./ml-reranker"
import { FeatureExtractor } from "./feature-extractor"
import { SnippetGenerator } from "./snippet-generator"
import Redis from "ioredis"

interface SearchParams {
  query: string
  page: number
  pageSize: number
  filters: any
  intent: string
}

interface SearchResult {
  documents: any[]
  total: number
}

export class SearchService {
  private esClient: Client
  private bm25Scorer: BM25Scorer
  private reranker: MLReranker
  private featureExtractor: FeatureExtractor
  private snippetGenerator: SnippetGenerator
  private cache: Redis

  constructor() {
    this.esClient = new Client({
      node: process.env.ELASTICSEARCH_URL,
    })

    this.bm25Scorer = new BM25Scorer()
    this.reranker = new MLReranker()
    this.featureExtractor = new FeatureExtractor()
    this.snippetGenerator = new SnippetGenerator()

    this.cache = new Redis({
      host: process.env.REDIS_HOST,
      port: Number.parseInt(process.env.REDIS_PORT || "6379"),
    })
  }

  async search(params: SearchParams): Promise<SearchResult> {
    // Check cache
    const cacheKey = this.getCacheKey(params)
    const cached = await this.cache.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }

    // Stage 1: BM25 retrieval (top 1000)
    const candidates = await this.retrieveCandidates(params)

    // Stage 2: ML reranking (top 100)
    const reranked = await this.rerankCandidates(params.query, candidates.slice(0, 1000))

    // Generate snippets
    const resultsWithSnippets = await Promise.all(
      reranked.slice(0, 100).map((doc) => this.addSnippet(doc, params.query)),
    )

    // Paginate
    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const paginatedResults = resultsWithSnippets.slice(start, end)

    const result = {
      documents: paginatedResults,
      total: candidates.total,
    }

    // Cache for 5 minutes
    await this.cache.setex(cacheKey, 300, JSON.stringify(result))

    return result
  }

  private async retrieveCandidates(params: SearchParams) {
    const { query, filters } = params

    // Build Elasticsearch query
    const esQuery: any = {
      bool: {
        must: [
          {
            multi_match: {
              query,
              fields: ["title^2.0", "body", "anchor^1.5", "url^1.2"],
              type: "best_fields",
            },
          },
        ],
        filter: [],
      },
    }

    // Add filters
    if (filters.language) {
      esQuery.bool.filter.push({
        term: { language: filters.language },
      })
    }

    if (filters.site) {
      esQuery.bool.filter.push({
        prefix: { url: `https://${filters.site}` },
      })
    }

    if (filters.date_range) {
      esQuery.bool.filter.push({
        range: {
          crawl_timestamp: {
            gte: filters.date_range.start,
            lte: filters.date_range.end,
          },
        },
      })
    }

    // Execute search
    const response = await this.esClient.search({
      index: "search_index",
      body: {
        query: esQuery,
        size: 1000,
        _source: ["url", "title", "meta_description", "body", "pagerank", "doc_length", "crawl_timestamp"],
      },
    })

    return {
      documents: response.hits.hits.map((hit) => ({
        doc_id: hit._id,
        bm25_score: hit._score,
        ...hit._source,
      })),
      total: response.hits.total.value,
    }
  }

  private async rerankCandidates(query: string, candidates: any[]) {
    // Extract features for all candidates
    const features = await Promise.all(candidates.map((doc) => this.featureExtractor.extract(query, doc)))

    // Get ML scores
    const mlScores = await this.reranker.predictBatch(features)

    // Combine scores and sort
    const scored = candidates.map((doc, i) => ({
      ...doc,
      ml_score: mlScores[i],
      final_score: this.computeFinalScore({
        bm25Score: doc.bm25_score,
        pagerank: doc.pagerank,
        mlScore: mlScores[i],
      }),
    }))

    scored.sort((a, b) => b.final_score - a.final_score)

    return scored
  }

  private computeFinalScore(signals: {
    bm25Score: number
    pagerank: number
    mlScore: number
  }): number {
    const weights = {
      bm25: 0.4,
      pagerank: 0.2,
      ml: 0.4,
    }

    return (
      weights.bm25 * this.normalize(signals.bm25Score, 0, 50) +
      weights.pagerank * signals.pagerank +
      weights.ml * this.sigmoid(signals.mlScore)
    )
  }

  private normalize(value: number, min: number, max: number): number {
    return Math.max(0, Math.min(1, (value - min) / (max - min)))
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x))
  }

  private async addSnippet(doc: any, query: string) {
    const snippet = await this.snippetGenerator.generate(doc.body, query, 200)

    return {
      doc_id: doc.doc_id,
      url: doc.url,
      title: doc.title,
      snippet,
      score: doc.final_score,
      highlights: this.extractHighlights(query),
      metadata: {
        pagerank: doc.pagerank,
        crawl_timestamp: doc.crawl_timestamp,
      },
    }
  }

  private extractHighlights(query: string): string[] {
    return query
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 2)
  }

  async getSuggestions(query: string, limit = 10) {
    const response = await this.esClient.search({
      index: "query_logs",
      body: {
        query: {
          prefix: {
            query_text: query.toLowerCase(),
          },
        },
        sort: [{ frequency: { order: "desc" } }],
        size: limit,
      },
    })

    return response.hits.hits.map((hit) => ({
      text: hit._source.query_text,
      frequency: hit._source.frequency,
    }))
  }

  private getCacheKey(params: SearchParams): string {
    return `search:${JSON.stringify(params)}`
  }
}
