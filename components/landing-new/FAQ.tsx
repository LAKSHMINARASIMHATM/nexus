"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "How is NEXUS different?",
        answer: "We don't track, profile, or sell your data. Every search is anonymous. We show you what exists, not what algorithms think you should see.",
    },
    {
        question: "Do you store my search history?",
        answer: "No. Zero-knowledge architecture. Your searches exist only on your device. We have no visibility into what you search.",
    },
    {
        question: "Is it really free?",
        answer: "Completely free. We're funded by principles, not by selling user data. Premium features coming soon.",
    },
    {
        question: "How fast is it?",
        answer: "Average response time is 12ms. No tracking overhead means pure performance. What you see is what you get.",
    },
    {
        question: "Can I export my data?",
        answer: "You own your data. Export bookmarks, history, settings anytime in standard formats.",
    },
    {
        question: "What about API access?",
        answer: "Developer API available now. Webhooks, real-time feeds, and bulk search support for enterprises.",
    },
];

export default function FAQ() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section id="faq" ref={containerRef} className="py-24 px-4 bg-background">
            <div className="max-w-3xl mx-auto">
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-display font-black mb-4">
                        QUESTIONS
                    </h2>
                    <p className="font-body font-bold text-foreground/60 text-lg">
                        Everything you need to know about NEXUS
                    </p>
                </div>

                <div className="space-y-2">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-2 border-foreground/20 data-[state=open]:border-foreground/50 transition-colors"
                            >
                                <AccordionTrigger className="hover:bg-foreground/5 transition-colors py-4 px-6 font-display font-black text-left text-lg hover:no-underline">
                                    <span className="flex-1">{faq.question}</span>
                                    <Plus className="h-5 w-5 shrink-0 transition-transform duration-200" />
                                </AccordionTrigger>
                                <AccordionContent className="pb-4 px-6 text-foreground/70 font-body text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
