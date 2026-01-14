import { Router, type Request, type Response } from "express"
import { SearchService } from "../services/search"
import { SpellCorrector } from "../services/spell-corrector"
import { QueryClassifier } from "../services/query-classifier"
import { rateLimit } from "../middleware/rate-limiter"
import { authenticate } from "../middleware/auth"

const router = Router()
const searchService = new SearchService()
const spellCorrector = new SpellCorrector()
const queryClassifier = new QueryClassifier()

// Search endpoint
router.post("/search", authenticate, rateLimit({ max: 1000, windowMs: 60000 }), async (req: Request, res: Response) => {
  const startTime = Date.now()

  try {
    const { query, page = 1, page_size = 10, filters = {}, options = {} } = req.body

    // Validate query
    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        error: {
          code: "INVALID_QUERY",
          message: "Query string is required",
        },
      })
    }

    // Spell correction
    let correctedQuery = query
    if (options.spell_correct !== false) {
      correctedQuery = await spellCorrector.correct(query)
    }

    // Query classification
    const intent = queryClassifier.classify(correctedQuery)

    // Execute search
    const results = await searchService.search({
      query: correctedQuery,
      page,
      pageSize: page_size,
      filters,
      intent,
    })

    // Get suggestions
    const suggestions = await searchService.getSuggestions(correctedQuery)

    const queryTime = Date.now() - startTime

    res.json({
      query: {
        original: query,
        corrected: correctedQuery,
        intent,
      },
      results: results.documents,
      total_results: results.total,
      page,
      page_size,
      query_time_ms: queryTime,
      suggestions,
    })
  } catch (error) {
    console.error("Search error:", error)
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "An error occurred processing your search",
      },
      request_id: req.id,
    })
  }
})

// Auto-complete suggestions
router.get("/suggest", authenticate, rateLimit({ max: 2000, windowMs: 60000 }), async (req: Request, res: Response) => {
  try {
    const { q, limit = 10 } = req.query

    if (!q) {
      return res.status(400).json({
        error: {
          code: "INVALID_QUERY",
          message: 'Query parameter "q" is required',
        },
      })
    }

    const suggestions = await searchService.getSuggestions(q as string, Number.parseInt(limit as string))

    res.json({
      query: q,
      suggestions,
    })
  } catch (error) {
    console.error("Suggest error:", error)
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "An error occurred getting suggestions",
      },
    })
  }
})

export default router
