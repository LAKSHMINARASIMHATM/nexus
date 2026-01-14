"use client"

import { useState } from "react"
import { NeuralBackground } from "@/components/landing/NeuralBackground"
import { ParticleBackground } from "@/components/landing/ParticleBackground"
import { GridBackground } from "@/components/landing/GridBackground"
import { OrbitalBackground } from "@/components/landing/OrbitalBackground"
import { SearchHero } from "@/components/landing/SearchHero"
import { Button } from "@/components/ui/button"

export default function PreviewPage() {
    const [currentDesign, setCurrentDesign] = useState<"neural" | "ethereal" | "cyberpunk" | "orbital">("neural")

    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            {/* Background Switcher */}
            {currentDesign === "neural" && <NeuralBackground />}
            {currentDesign === "ethereal" && <ParticleBackground />}
            {currentDesign === "cyberpunk" && <GridBackground />}
            {currentDesign === "orbital" && <OrbitalBackground />}

            {/* UI Overlay */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                <Button
                    variant={currentDesign === "neural" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentDesign("neural")}
                    className="text-xs"
                >
                    Neural Mind
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

            {/* Hero Content */}
            <SearchHero onSearch={(q) => console.log(q)} />
        </main>
    )
}
