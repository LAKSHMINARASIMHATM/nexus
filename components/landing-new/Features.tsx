"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Zap, Eye, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: Shield,
        title: "No Tracking",
        description: "Your searches are yours alone. Zero logs. Zero tracking. Zero compromise."
    },
    {
        icon: Zap,
        title: "Instant Speed",
        description: "Results in milliseconds. We don't slow you down with analytics."
    },
    {
        icon: Eye,
        title: "Unfiltered",
        description: "See what exists. Not what algorithms think you should see."
    },
    {
        icon: Cpu,
        title: "Pure Intelligence",
        description: "AI that understands. Synthesizes. Delivers real answers."
    }
];

export default function Features() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: "power3.out"
            });
        });
    }, { scope: containerRef });

    return (
        <section id="features" ref={containerRef} className="py-24 px-4 bg-background border-y-4 border-foreground/20 relative">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-display font-black mb-20 text-center">
                    WHY NEXUS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div key={index} ref={(el) => { cardsRef.current[index] = el; }}>
                            <div className="brutalist-box p-8 h-full flex flex-col gap-4 hover:bg-foreground/5 transition-colors">
                                <feature.icon className="w-12 h-12 text-foreground" />
                                <h3 className="text-xl font-display font-black">{feature.title}</h3>
                                <p className="text-sm font-body text-foreground/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
