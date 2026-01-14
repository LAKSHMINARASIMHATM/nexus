"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  doc_id: string
  url: string
  title: string
  snippet: string
  score: number
  highlights: string[]
  metadata: {
    pagerank?: number
    crawl_timestamp: string
  }
}

export function SearchResults() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [queryTime, setQueryTime] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleSearch = async (searchQuery: string, page = 1) => {
    if (!searchQuery.trim()) return

    setLoading(true)

    try {
      const response = await fetch("/api/v1/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          query: searchQuery,
          page,
          page_size: 10,
          options: {
            spell_correct: true,
          },
        }),
      })

      const data = await response.json()

      setResults(data.results)
      setTotalResults(data.total_results)
      setQueryTime(data.query_time_ms)
      setSuggestions(data.suggestions || [])
      setCurrentPage(page)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const highlightText = (text: string, highlights: string[]) => {
    let highlighted = text
    highlights.forEach((term) => {
      const regex = new RegExp(`(${term})`, "gi")
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
    })
    return highlighted
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search the web..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </form>

          {totalResults > 0 && (
            <div className="mt-2 text-sm text-muted-foreground">
              About {totalResults.toLocaleString()} results ({queryTime}ms)
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto p-4">
        {/* Related Searches */}
        {suggestions.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Related searches:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => {
                    setQuery(suggestion.text)
                    handleSearch(suggestion.text)
                  }}
                >
                  {suggestion.text}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.doc_id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <a href={result.url} className="block group" target="_blank" rel="noopener noreferrer">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-medium text-primary group-hover:underline">{result.title}</h3>
                    {result.metadata.pagerank && result.metadata.pagerank > 0.5 && (
                      <Badge variant="outline" className="text-xs shrink-0">
                        Authority: {(result.metadata.pagerank * 100).toFixed(0)}%
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-green-600 mb-2 truncate">{result.url}</div>

                  <p
                    className="text-sm text-foreground/80 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(result.snippet, result.highlights),
                    }}
                  />
                </a>

                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>Score: {(result.score * 100).toFixed(1)}%</span>
                  <span>Indexed: {new Date(result.metadata.crawl_timestamp).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {results.length > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => handleSearch(query, currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {[...Array(Math.min(10, Math.ceil(totalResults / 10)))].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleSearch(query, i + 1)}
                  disabled={loading}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handleSearch(query, currentPage + 1)}
              disabled={currentPage >= Math.ceil(totalResults / 10) || loading}
            >
              Next
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && query && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">Try different keywords or check your spelling</p>
          </div>
        )}
      </div>
    </div>
  )
}
