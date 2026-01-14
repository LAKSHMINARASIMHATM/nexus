"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Servers Worldwide", value: 450, suffix: "" },
    { label: "Queries Per Second", value: 50000, suffix: "+" },
    { label: "Privacy Rating", value: 100, suffix: "/100" },
    { label: "Avg Response", value: 12, suffix: "ms" },
];

export default function Stats() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".stat-item", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            },
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.5)"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-foreground text-background border-y-4 border-background/30">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item flex flex-col items-center text-center">
                            <span className="text-5xl md:text-7xl font-display font-black mb-2">
                                <Counter target={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className="font-body font-bold uppercase tracking-wide text-sm">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counterRef.current,
                start: "top 80%",
            },
            onUpdate: () => {
                setCount(obj.val);
            }
        });
    }, [target]);

    const formatted = count % 1 !== 0 ? count.toFixed(0) : Math.floor(count).toLocaleString();

    return <span ref={counterRef}>{formatted}{suffix}</span>;
}
