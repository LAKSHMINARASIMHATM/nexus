"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        text: "Finally found what I was looking for without feeling tracked.",
        author: "Jordan",
        role: "Researcher",
    },
    {
        text: "No bias. No algorithms hiding results. Pure truth.",
        author: "Morgan",
        role: "Journalist",
    },
    {
        text: "The speed is unreal. And they actually respect privacy.",
        author: "Casey",
        role: "Tech Lead",
    },
    {
        text: "Switched completely. Never going back to the big ones.",
        author: "Alex",
        role: "Developer",
    },
];

export default function Testimonials() {
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
                opacity: 0,
                duration: 0.8,
                delay: index * 0.12,
                ease: "power3.out",
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-4 bg-background/95">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-display font-black mb-16 text-center">
                    WHAT PEOPLE SAY
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} ref={(el) => { cardsRef.current[index] = el; }}>
                            <div className="brutalist-box p-6 h-full flex flex-col gap-4 hover:bg-foreground/2 transition-colors">
                                <p className="text-sm font-body leading-relaxed font-semibold flex-1">
                                    "{testimonial.text}"
                                </p>
                                <div className="border-t border-foreground/20 pt-4">
                                    <p className="font-display font-black text-lg">{testimonial.author}</p>
                                    <p className="text-xs font-mono text-foreground/50 font-bold">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
