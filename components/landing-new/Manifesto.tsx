"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
            },
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="relative py-32 px-4 bg-background overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-foreground/20" />
            <div className="absolute top-20 left-1/4 w-32 h-px bg-foreground/10 transform -rotate-45" />
            <div className="absolute top-40 right-1/3 w-48 h-px bg-foreground/10 transform rotate-12" />

            <div ref={contentRef} className="max-w-5xl mx-auto relative">
                {/* Background text */}
                <div className="absolute -top-10 left-0 pointer-events-none">
                    <div className="text-9xl md:text-[12vw] font-display font-black text-foreground/5 leading-none select-none">
                        MANIFEST
                    </div>
                </div>

                {/* Main content */}
                <div className="relative z-10 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left column */}
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-6xl font-display font-black leading-tight">
                                OUR PROMISE
                            </h2>
                            <p className="text-lg font-body leading-relaxed font-semibold text-foreground/80">
                                We believe search should be about <span className="text-foreground font-black">truth, not profit</span>.
                            </p>
                            <p className="text-base font-body leading-relaxed text-foreground/70">
                                No tracking. No selling your data. No hidden agendas. Just pure, unfiltered search results that respect your privacy and your intelligence.
                            </p>
                        </div>

                        {/* Right column with decorative box */}
                        <div className="relative">
                            <div className="brutalist-box p-8 space-y-4">
                                <h3 className="text-3xl font-display font-black">WE BUILT NEXUS FOR:</h3>
                                <ul className="space-y-3 font-body font-bold text-sm">
                                    <li>✦ Researchers seeking truth</li>
                                    <li>✦ Journalists demanding facts</li>
                                    <li>✦ Developers building better</li>
                                    <li>✦ Everyone wanting freedom</li>
                                </ul>
                            </div>

                            {/* Overlapping text behind box */}
                            <div className="absolute -bottom-8 -right-8 text-7xl font-display font-black text-foreground/8 pointer-events-none leading-none">
                                FREE
                            </div>
                        </div>
                    </div>

                    {/* Bottom section with large text */}
                    <div className="border-t-2 border-foreground/20 pt-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-body font-bold uppercase tracking-wider text-foreground/60">
                                NO COMPROMISES
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="brutalist-box p-6">
                                    <div className="text-4xl font-display font-black mb-2">100%</div>
                                    <div className="font-body font-bold">Private</div>
                                    <p className="text-sm text-foreground/60 mt-2">Your searches never leave your device</p>
                                </div>
                                <div className="brutalist-box p-6">
                                    <div className="text-4xl font-display font-black mb-2">12ms</div>
                                    <div className="font-body font-bold">Response Time</div>
                                    <p className="text-sm text-foreground/60 mt-2">No tracking overhead means pure speed</p>
                                </div>
                                <div className="brutalist-box p-6">
                                    <div className="text-4xl font-display font-black mb-2">∞</div>
                                    <div className="font-body font-bold">Unfiltered</div>
                                    <p className="text-sm text-foreground/60 mt-2">See what exists, not what we think you want</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decorative lines */}
            <div className="absolute bottom-0 left-0 right-0 space-y-2 pointer-events-none">
                <div className="h-1 bg-foreground/20 w-1/3" />
                <div className="h-1 bg-foreground/15 w-2/3 ml-auto" />
                <div className="h-1 bg-foreground/10 w-1/2 mx-auto" />
            </div>
        </section>
    );
}
