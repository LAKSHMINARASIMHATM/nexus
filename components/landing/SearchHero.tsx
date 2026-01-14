"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Mic, Command } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

export interface SearchHeroProps {
    onSearch: (query: string) => void
    defaultValue?: string
    theme?: "light" | "dark"
}

export function SearchHero({ onSearch, defaultValue = "", theme = "dark" }: SearchHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const tagsRef = useRef<HTMLDivElement>(null)
    const [query, setQuery] = useState(defaultValue)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.2 }
        )
            .fromTo(searchRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8 },
                "-=0.5"
            )
            .fromTo(tagsRef.current?.children || [],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
                "-=0.3"
            )
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            // Animate out
            gsap.to(containerRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    onSearch(query)
                }
            })
        }
    }

    const isDark = theme === "dark"

    return (
        <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1
                ref={titleRef}
                className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent mb-8 tracking-tight ${isDark
                        ? "bg-gradient-to-r from-white via-indigo-200 to-indigo-400"
                        : "bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600"
                    }`}
            >
                Discover Intelligence
            </h1>

            <div
                ref={searchRef}
                className="w-full max-w-2xl relative group"
            >
                <div className={`absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isDark
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                        : "bg-gradient-to-r from-indigo-400 to-blue-500"
                    }`} />
                <form onSubmit={handleSearch} className="relative">
                    <div className={`relative flex items-center backdrop-blur-xl border rounded-xl shadow-2xl overflow-hidden ${isDark
                            ? "bg-white/10 border-white/20"
                            : "bg-white/70 border-slate-200/50"
                        }`}>
                        <Search className={`ml-4 h-6 w-6 ${isDark ? "text-indigo-200" : "text-indigo-600"}`} />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className={`h-16 border-0 bg-transparent text-lg placeholder:text-opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0 ${isDark
                                    ? "text-white placeholder:text-white"
                                    : "text-slate-900 placeholder:text-slate-500"
                                }`}
                            placeholder="Ask anything..."
                        />
                        <div className="mr-4 flex items-center gap-2">
                            <Button size="icon" variant="ghost" className={`${isDark
                                    ? "text-white/70 hover:text-white hover:bg-white/10"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                }`}>
                                <Mic className="h-5 w-5" />
                            </Button>
                            <div className={`hidden md:flex items-center gap-1 text-xs px-2 py-1 rounded border ${isDark
                                    ? "text-white/50 bg-white/5 border-white/10"
                                    : "text-slate-500 bg-slate-100 border-slate-200"
                                }`}>
                                <Command className="h-3 w-3" />
                                <span>K</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div
                ref={tagsRef}
                className="mt-8 flex flex-wrap justify-center gap-3"
            >
                {["AI Research", "Deep Learning", "Neural Networks", "Quantum Computing"].map((tag) => (
                    <span
                        key={tag}
                        className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 border ${isDark
                                ? "bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10 hover:border-indigo-500/50"
                                : "bg-white/50 border-slate-200 text-slate-600 hover:bg-white hover:border-indigo-300 hover:shadow-sm"
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
