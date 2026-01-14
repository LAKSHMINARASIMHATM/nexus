"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Search, ArrowRight } from "lucide-react";
import Search3DBackground from "./Search3DBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero({ onSearch, defaultValue = "" }: { onSearch?: (query: string) => void, defaultValue?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState(defaultValue);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(titleRef.current, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
        })
            .from(searchRef.current, {
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
            }, "-=0.6");

    }, { scope: containerRef });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && query.trim()) {
            onSearch(query);
        }
    };

    return (
        <section ref={containerRef} className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center overflow-hidden px-4 py-20">
            <Search3DBackground />

            {/* Decorative top line */}
            <div className="absolute top-32 left-0 right-0 h-1 bg-foreground/30 transform -rotate-2" />
            <div className="absolute top-40 left-1/4 w-32 h-1 bg-foreground/20" />
            <div className="absolute top-36 right-1/4 w-24 h-1 bg-foreground/20 transform -rotate-3" />

            <div className="z-10 w-full max-w-6xl relative">
                {/* Overlapping text layers - top section */}
                <div className="absolute -top-20 left-0 right-0">
                    <div className="text-6xl md:text-8xl font-display font-black text-foreground/8 pointer-events-none select-none leading-none transform -rotate-3">
                        UNFILTERED SEARCH
                    </div>
                </div>

                {/* Main navigation/section text on left */}
                <div className="absolute -left-8 top-1/4 space-y-2 text-lg md:text-2xl font-display font-black text-foreground/60 leading-tight z-20">
                    <div className="pointer-events-none">NEXUS.COM</div>
                    <div className="text-sm font-body font-bold tracking-wider pointer-events-none">—</div>

                    <button
                        onClick={() => searchRef.current?.querySelector('input')?.focus()}
                        className="group flex items-center gap-3 hover:text-foreground transition-colors cursor-pointer"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        SEARCH
                    </button>

                    <button
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex items-center gap-3 hover:text-foreground transition-colors cursor-pointer"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        DISCOVER
                    </button>

                    <button
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex items-center gap-3 hover:text-foreground transition-colors cursor-pointer"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        EXPLORE
                    </button>

                    <div className="text-xs font-mono font-bold pointer-events-none pt-2 opacity-50">COMING SOON</div>
                </div>

                {/* Center content */}
                <div className="text-center space-y-12 relative">
                    {/* Large background text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <h1 className="text-[20vw] font-display font-black text-foreground/4 select-none leading-none tracking-tighter whitespace-nowrap">
                            HATWAR
                        </h1>
                    </div>

                    {/* Main title */}
                    <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter relative z-10">
                        NEXUS
                    </h1>

                    {/* Subtitle and secondary text */}
                    <div className="space-y-4 relative z-10">
                        <p className="text-xl md:text-2xl font-body font-bold text-foreground/70">
                            A search engine that doesn't hide.
                            <br />
                            <span className="text-foreground font-black">Direct results. Zero compromise.</span>
                        </p>
                    </div>

                    {/* Search box */}
                    <div ref={searchRef} className="w-full max-w-2xl mx-auto relative group z-10">
                        <div className="absolute -inset-1 border-4 border-foreground/20 bg-foreground/2" />

                        <form onSubmit={handleSubmit} className="relative flex items-center bg-background border-2 border-foreground p-2">
                            <Search className="w-6 h-6 ml-4 text-foreground/60" />
                            <Input
                                className="border-none bg-transparent h-14 text-lg px-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/40 font-mono font-semibold"
                                placeholder="What are you searching for?"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button type="submit" size="icon" className="bg-foreground hover:bg-foreground/80 text-background border-none">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </form>
                    </div>

                    {/* Stats boxes */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-sm font-mono font-bold text-foreground/60 relative z-10">
                        <div className="brutalist-box p-4">
                            <div className="text-foreground font-black text-lg">12M+</div>
                            <div>Searches Daily</div>
                        </div>
                        <div className="brutalist-box p-4">
                            <div className="text-foreground font-black text-lg">99.9%</div>
                            <div>Uptime</div>
                        </div>
                        <div className="brutalist-box p-4">
                            <div className="text-foreground font-black text-lg">0ms</div>
                            <div>Tracking</div>
                        </div>
                    </div>
                </div>

                {/* Right side text - large overlapping */}
                <div className="absolute right-0 top-1/3 space-y-0 pointer-events-none opacity-50">
                    <div className="text-7xl md:text-9xl font-display font-black text-foreground/6 leading-none">
                        TRUTH
                    </div>
                    <div className="text-6xl md:text-8xl font-display font-black text-foreground/8 -mt-4 leading-none">
                        RESULTS
                    </div>
                </div>

                {/* Bottom decorative lines */}
                <div className="absolute -bottom-32 left-0 right-0 space-y-2">
                    <div className="h-1 bg-foreground/30 w-3/4 transform rotate-2" />
                    <div className="h-1 bg-foreground/20 w-1/3 ml-auto transform -rotate-1" />
                    <div className="h-1 bg-foreground/25 w-1/2" />
                </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce z-10">
                <div className="w-6 h-10 border-2 border-foreground/40 flex justify-center p-1">
                    <div className="w-1 h-2 bg-foreground/60 animate-scroll" />
                </div>
            </div>
        </section>
    );
}
