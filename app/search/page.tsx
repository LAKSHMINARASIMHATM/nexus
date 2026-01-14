"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Mic, Camera, Moon, Sun, Compass, ArrowRight, Sparkles, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserMenu } from "@/components/auth/user-menu";
import { RecommendationsWidget } from "@/components/RecommendationsWidget";
import { SearchResultPreview } from "@/components/WebsitePreview";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const SEARCH_CATEGORIES = [
    { id: 'all', label: 'All', domains: [] },
    { id: 'news', label: 'News', domains: ['reuters.com', 'apnews.com', 'bbc.com', 'aljazeera.com', 'nytimes.com', 'theguardian.com', 'wsj.com', 'bloomberg.com', 'cnbc.com', 'dw.com', 'france24.com', 'thehindu.com'] },
    { id: 'tech', label: 'Tech & AI', domains: ['theverge.com', 'techcrunch.com', 'arstechnica.com', 'wired.com', 'openai.com', 'anthropic.com', 'huggingface.co', 'deepmind.com', 'github.com', 'news.ycombinator.com', 'engadget.com', 'cnet.com'] },
    { id: 'dev', label: 'Development', domains: ['developer.mozilla.org', 'docker.com', 'kubernetes.io', 'react.dev', 'nextjs.org', 'typescriptlang.org', 'stackoverflow.com', 'dev.to', 'hashnode.com'] },
    { id: 'finance', label: 'Finance', domains: ['investopedia.com', 'forbes.com', 'businessinsider.com', 'marketwatch.com', 'fool.com', 'nerdwallet.com', 'morningstar.com', 'yahoo.com', 'coinmarketcap.com'] },
    { id: 'edu', label: 'Education', domains: ['wikipedia.org', 'britannica.com', 'khanacademy.org', 'coursera.org', 'edx.org', 'udemy.com', 'freecodecamp.org', 'scholar.google.com'] },
    { id: 'gaming', label: 'Gaming & Ent', domains: ['imdb.com', 'rottentomatoes.com', 'ign.com', 'gamespot.com', 'pcgamer.com', 'kotaku.com', 'polygon.com', 'hltv.org', 'liquipedia.net'] },
    { id: 'health', label: 'Health', domains: ['webmd.com', 'mayoclinic.org', 'healthline.com', 'nih.gov', 'cdc.gov', 'who.int'] },
    { id: 'science', label: 'Science', domains: ['nature.com', 'scientificamerican.com', 'nationalgeographic.com', 'nasa.gov', 'space.com', 'sciencedaily.com', 'phys.org'] },
    { id: 'legal', label: 'Law & Gov', domains: ['findlaw.com', 'justia.com', 'supremecourt.gov', 'law.cornell.edu', 'usa.gov', 'un.org', 'gov.uk'] }
];

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchCategory, setSearchCategory] = useState("all");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(7)}`);

    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Sync dark mode with local storage or system preference
    useEffect(() => {
        const checkDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(checkDark);
    }, []);

    const toggleDarkMode = () => {
        const newDark = !isDarkMode;
        setIsDarkMode(newDark);
        if (newDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Perform search
    const performSearch = useCallback(async (searchQuery: string, categoryId: string = searchCategory) => {
        if (!searchQuery.trim()) {
            setResults(null);
            return;
        }

        const category = SEARCH_CATEGORIES.find(c => c.id === categoryId);
        const filters = category?.domains && category.domains.length > 0
            ? { site: category.domains }
            : {};

        // Update URL without reloading
        const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
        window.history.pushState({ path: newUrl }, "", newUrl);

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setLoading(true);

        try {
            const res = await fetch("/api/v1/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId,
                },
                body: JSON.stringify({
                    query: searchQuery,
                    page: 1,
                    page_size: 10,
                    filters
                }),
                signal: abortController.signal,
            });

            if (!res.ok) {
                throw new Error(`Search failed: ${res.status}`);
            }

            const data = await res.json();
            setResults(data);
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error("Search failed:", error);
            }
        } finally {
            if (!abortController.signal.aborted) {
                setLoading(false);
            }
        }
    }, [sessionId, searchCategory]);

    // Initial search on mount if query exists
    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery);
        }
    }, []); // Run once on mount

    // Handle form submission
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(query);
    };

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
            });
        } catch (error) {
            console.error("Click tracking failed:", error);
        }
    }, [sessionId, query]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Clear existing timeouts
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        if (suggestionTimeoutRef.current) {
            clearTimeout(suggestionTimeoutRef.current);
        }

        // Debounce suggestions (faster, 150ms)
        if (value.length > 2) {
            suggestionTimeoutRef.current = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/v1/suggest?q=${encodeURIComponent(value)}`);
                    const data = await res.json();
                    setSuggestions(data.suggestions?.map((s: any) => s.text || s) || []);
                } catch (error) {
                    console.error("Suggestion failed:", error);
                }
            }, 150);
        } else {
            setSuggestions([]);
        }

        // Debounce search (500ms for real-time results)
        if (value.trim().length > 2) {
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(value);
            }, 500);
        } else if (value.trim().length === 0) {
            setResults(null);
        }
    };

    // Handle voice search
    const handleMicClick = async () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.');
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setQuery(transcript);
            performSearch(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    // Handle camera search (image search)
    const handleCameraClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (file) {
                // In a real implementation, you would upload the image to an OCR service
                // For now, we'll just use the filename as a mock search
                const filename = file.name.replace(/\.[^/.]+$/, "");
                const searchQuery = `image: ${filename}`;
                setQuery(searchQuery);
                performSearch(searchQuery);
            }
        };
        input.click();
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
            if (suggestionTimeoutRef.current) clearTimeout(suggestionTimeoutRef.current);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    return (
        <div className="bg-mesh min-h-screen transition-colors duration-300 relative font-immersive">
            <div className="fixed inset-0 bg-dots pointer-events-none"></div>

            <header className="sticky top-0 z-50 glass-panel !border-x-0 !border-t-0 !rounded-none">
                <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center gap-8">
                    <h1 className="text-xl font-bold tracking-[0.2em] text-foreground uppercase cursor-pointer shrink-0" onClick={() => router.push('/')}>Nexus</h1>
                    <div className="relative flex-1 max-w-3xl mx-auto">
                        <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 px-5 py-2 rounded-full shadow-inner backdrop-blur-sm group focus-within:border-blue-500/50 transition-all w-full">
                            <Search className="text-slate-400 h-5 w-5 shrink-0" />
                            <div className="w-[120px] shrink-0 border-r border-slate-200 dark:border-slate-800 pr-2 hidden md:block">
                                <Select
                                    value={searchCategory}
                                    onValueChange={(val) => {
                                        setSearchCategory(val);
                                        if (query.trim()) performSearch(query, val);
                                    }}
                                >
                                    <SelectTrigger className="bg-transparent border-none h-8 text-xs font-semibold focus:ring-0">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent className="glass-panel border-white/10">
                                        {SEARCH_CATEGORIES.map(cat => (
                                            <SelectItem key={cat.id} value={cat.id} className="text-xs">
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none placeholder-slate-400 font-medium py-1.5"
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                placeholder="Explore the nexus..."
                            />
                            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4 shrink-0">
                                <button
                                    type="button"
                                    className={`text-slate-400 hover:text-blue-500 transition-colors ${isListening ? 'text-red-500 hover:text-red-600 animate-pulse' : ''}`}
                                    onClick={handleMicClick}
                                    disabled={isListening}
                                >
                                    <Mic className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    className="text-slate-400 hover:text-blue-500 transition-colors"
                                    onClick={handleCameraClick}
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                        {suggestions.length > 0 && (
                            <Card className="absolute top-full left-0 right-0 mt-2 glass-panel border-white/10 shadow-2xl z-20 text-left overflow-hidden">
                                <CardContent className="p-2">
                                    {suggestions.map((s, i) => (
                                        <div
                                            key={i}
                                            className="p-3 hover:bg-white/10 rounded-xl cursor-pointer flex items-center gap-3 text-sm text-foreground/80 transition-colors"
                                            onClick={() => {
                                                setQuery(s);
                                                setSuggestions([]);
                                                performSearch(s);
                                            }}
                                        >
                                            <Search className="h-4 w-4 text-slate-400" />
                                            {s}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                        <button
                            className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors hidden md:block"
                            onClick={() => router.push('/admin')}
                            title="Admin Dashboard"
                        >
                            <Settings className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                        </button>
                        <button className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors" onClick={toggleDarkMode}>
                            <Moon className="h-5 w-5 dark:hidden text-slate-700" />
                            <Sun className="h-5 w-5 hidden dark:block text-yellow-400" />
                        </button>
                        <UserMenu />
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-8 py-10 relative z-10">
                <div className="flex gap-10">
                    <div className="flex-1 max-w-3xl">
                        {loading ? (
                            <div className="space-y-8 px-2">
                                <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded mb-8" />
                                <div className="glass-panel rounded-3xl p-8 space-y-12">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="space-y-4">
                                            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
                                            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
                                            <div className="h-20 w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : results ? (
                            <>
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-8 px-2">
                                    {results.total_results.toLocaleString()} Results found in {(results.query_time_ms / 1000).toFixed(1)}s
                                </p>
                                <div className="glass-panel rounded-3xl p-8 space-y-6">
                                    {results.results?.map((result: any, index: number) => (
                                        <SearchResultPreview
                                            key={result.doc_id}
                                            url={result.url}
                                            title={result.title}
                                            description={result.snippet}
                                            category={result.category}
                                            trustScore={Math.round(result.score * 100)}
                                            metadata={{
                                                published_date: result.metadata.published_date,
                                                author: result.metadata.author,
                                                word_count: result.metadata.word_count,
                                                language: result.metadata.language
                                            }}
                                            position={index + 1}
                                        />
                                    ))}
                                    {results.results?.length === 0 && (
                                        <div className="text-center py-12">
                                            <h3 className="text-lg font-medium">No results found</h3>
                                            <p className="text-slate-400">Try broadening your search criteria.</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 px-4 glass-panel rounded-[2rem]">
                                <Badge variant="outline" className="mb-4 bg-blue-500/10 border-blue-500/30 text-blue-400 p-2 rounded-xl">
                                    <Search className="h-6 w-6" />
                                </Badge>
                                <h3 className="text-2xl font-bold mb-2">Ready to explore?</h3>
                                <p className="text-slate-400 max-w-sm mx-auto">Enter keywords in the search bar above to query the massive Nexus index.</p>
                            </div>
                        )}
                    </div>

                    <aside className="w-[400px] shrink-0">
                        <div className="sticky top-24 space-y-6">
                            <RecommendationsWidget />

                            {results?.results?.[0] && (
                                <Card className="glass-panel border-white/10 rounded-3xl p-4 overflow-hidden shadow-2xl">
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Intelligence Brief</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="space-y-4">
                                            <div className="font-bold text-lg text-foreground">{new URL(results.results[0].url).hostname}</div>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                This source is a top-tier domain within the {searchCategory !== 'all' ? searchCategory : 'global'} index. Search algorithms have prioritized this result based on authority and relevance signals.
                                            </p>
                                            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                <span>Trust Score</span>
                                                <span className="text-blue-500">98/100</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </aside>
                </div>

                <section className="mt-12 pb-20">
                    <div className="glass-panel rounded-[2rem] p-10 border-white/10">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <Compass className="text-blue-500 h-6 w-6" />
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">Discover more for your search</h2>
                            </div>
                            <button className="text-[10px] font-bold text-slate-500 hover:text-blue-500 transition-colors flex items-center gap-2 uppercase tracking-[0.2em]" onClick={() => router.push('/discovery')}>
                                Full Catalog <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    title: "Neural Architecture",
                                    category: "Technology",
                                    sub: "Interface Design",
                                    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
                                },
                                {
                                    title: "Deep Sea Bio",
                                    category: "Science",
                                    sub: "Marine Life",
                                    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80"
                                },
                                {
                                    title: "Web3 Ecosystems",
                                    category: "Finance",
                                    sub: "Economic Models",
                                    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
                                },
                                {
                                    title: "Sustainable Cities",
                                    category: "Global",
                                    sub: "Urbanism",
                                    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80"
                                }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group cursor-pointer card-hover-immersive"
                                    onClick={() => router.push('/discovery')}
                                >
                                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 relative border border-white/10">
                                        {/* Background Image with blur effect */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                            <Sparkles className="h-10 w-10 text-white drop-shadow-glow" />
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5 z-20">
                                            <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">Explore</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">{item.category}</p>
                                    <h3 className="font-bold text-base leading-snug text-foreground group-hover:text-blue-500 transition-colors">{item.title}</h3>
                                    <p className="text-[11px] text-slate-400 mt-1">{item.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <div className="fixed bottom-8 right-8 z-50">
                <button className="w-14 h-14 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden border border-white/20">
                    <span className="text-xl font-black group-hover:rotate-12 transition-transform">SH</span>
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-mesh">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Indexing...</span>
            </div>
        </div>}>
            <SearchResults />
        </Suspense>
    );
}
