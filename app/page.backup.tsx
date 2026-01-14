"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Search, Mic, Camera } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UserMenu } from "@/components/auth/user-menu"
import { NeuralBackground } from "@/components/landing/NeuralBackground"
import { ParticleBackground } from "@/components/landing/ParticleBackground"
import { GridBackground } from "@/components/landing/GridBackground"
import { OrbitalBackground } from "@/components/landing/OrbitalBackground"
import { SearchHero } from "@/components/landing/SearchHero"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [currentDesign, setCurrentDesign] = useState<"neural" | "ethereal" | "cyberpunk" | "orbital">("neural")
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(7)}`)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Debounced search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null)
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setLoading(true)
    try {
      const res = await fetch("/api/v1/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({ query: searchQuery, page: 1, page_size: 10 }),
        signal: abortController.signal,
      })

      if (!res.ok) {
        throw new Error(`Search failed: ${res.status}`)
      }

      const data = await res.json()
      setResults(data)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Search failed:", error)
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false)
      }
    }
  }, [sessionId])

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  // Track click events
  const handleResultClick = useCallback(async (
    docId: string,
    url: string,
    position: number,
    searchEventId?: string
  ) => {
    try {
      await fetch("/api/v1/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({
          search_event_id: searchEventId || '',
          doc_id: docId,
          position,
          url,
          query,
        }),
      })
    } catch (error) {
      console.error("Click tracking failed:", error)
    }
  }, [sessionId, query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    // Clear existing timeouts
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current)
    }

    // Debounce suggestions (faster, 150ms)
    if (value.length > 2) {
      suggestionTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/v1/suggest?q=${encodeURIComponent(value)}`)
          const data = await res.json()
          setSuggestions(data.suggestions?.map((s: any) => s.text || s) || [])
        } catch (error) {
          console.error("Suggestion failed:", error)
        }
      }, 150)
    } else {
      setSuggestions([])
    }

    // Debounce search (500ms for real-time results)
    if (value.trim().length > 2) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value)
      }, 500)
    } else if (value.trim().length === 0) {
      setResults(null)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
      if (suggestionTimeoutRef.current) clearTimeout(suggestionTimeoutRef.current)
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [])

  return (
    <div className={`min-h-screen flex flex-col relative ${(!results && !loading) ? "" : "bg-background"}`}>
      {!results && !loading && (
        <>
          {currentDesign === "neural" && <NeuralBackground />}
          {currentDesign === "ethereal" && <ParticleBackground />}
          {currentDesign === "cyberpunk" && <GridBackground />}
          {currentDesign === "orbital" && <OrbitalBackground />}
        </>
      )}
      {(results || loading) && (
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
          <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
            <div className="font-bold text-xl mr-4">SearchEngine</div>
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  placeholder="Search anything..."
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                  <Mic className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                  <Camera className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </div>
            </form>
            <UserMenu />
          </div>
          {suggestions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-1 shadow-lg z-20">
              <CardContent className="p-2">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-muted rounded cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setQuery(s)
                      setSuggestions([])
                      // Trigger search
                    }}
                  >
                    <Search className="h-3 w-3 text-muted-foreground" />
                    {s}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </header>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  <div className="h-16 w-full bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : results ? (
            <>
              <div className="text-sm text-muted-foreground">
                About {results.total_results || 0} results ({results.query_time_ms || 0} ms)
              </div>

              {results.results?.map((result: any, index: number) => (
                <div key={result.doc_id} className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(result.url).hostname}`}
                      className="w-4 h-4"
                      alt="favicon"
                    />
                    <span>{new URL(result.url).hostname}</span>
                  </div>
                  <a
                    href={result.url}
                    className="block group"
                    onClick={() => handleResultClick(
                      result.doc_id,
                      result.url,
                      index + 1,
                      results.meta?.search_event_id
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-xl text-blue-600 group-hover:underline visited:text-purple-800 transition-colors">
                      {result.title}
                    </h3>
                  </a>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {result.snippet}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {result.metadata.published_date && (
                      <Badge variant="secondary" className="text-xs">
                        {result.metadata.published_date}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      Score: {typeof result.score === 'number' ? result.score.toFixed(2) : '0.00'}
                    </Badge>
                  </div>
                </div>
              ))}

              {results.results?.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                <Button
                  variant={currentDesign === "neural" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentDesign("neural")}
                  className="text-xs"
                >
                  Neural
                </Button>
                <Button
                  variant={currentDesign === "ethereal" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentDesign("ethereal")}
                  className="text-xs"
                >
                  Ethereal
                </Button>
                <Button
                  variant={currentDesign === "cyberpunk" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentDesign("cyberpunk")}
                  className="text-xs"
                >
                  Cyberpunk
                </Button>
                <Button
                  variant={currentDesign === "orbital" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentDesign("orbital")}
                  className="text-xs"
                >
                  Orbital
                </Button>
              </div>
              <SearchHero
                onSearch={performSearch}
                defaultValue={query}
                theme={currentDesign === "ethereal" ? "light" : "dark"}
              />
            </>
          )}
        </div>

        <aside className="hidden lg:block space-y-6">
          {results?.results?.[0] && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">About this source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-medium">{new URL(results.results[0].url).hostname}</div>
                  <p className="text-xs text-muted-foreground">
                    Source information would appear here, pulled from the knowledge graph.
                  </p>
                  <Separator className="my-2" />
                  <div className="text-xs">
                    <span className="font-medium">First indexed:</span> 2 days ago
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </main>
    </div>
  )
}