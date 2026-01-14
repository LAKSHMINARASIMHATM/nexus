"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-4 bg-foreground text-background border-y-4 border-background/30">
            <div ref={contentRef} className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-display font-black leading-tight">
                        TAKE CONTROL
                    </h2>
                    <p className="text-lg font-body font-bold max-w-2xl mx-auto text-background/80">
                        Stop being tracked. Stop being manipulated.
                        Start searching with complete freedom.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button 
                        className="px-8 py-6 bg-background text-foreground border-2 border-background hover:bg-background/90 font-display font-black text-lg uppercase"
                        onClick={() => window.location.href = '/search'}
                    >
                        Start Now
                        <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                    <Button 
                        variant="outline" 
                        className="px-8 py-6 border-2 border-background text-background hover:bg-background/10 font-display font-black text-lg uppercase"
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Learn More
                    </Button>
                </div>

                <p className="text-sm font-mono font-semibold text-background/70">
                    No sign-up required. Search immediately.
                </p>
            </div>
        </section>
    );
}
