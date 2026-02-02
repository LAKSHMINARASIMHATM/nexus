"use client"

import { useState, useEffect } from "react"
import { Grid3x3, Brain, Orbit, Sparkles, Boxes, X } from "lucide-react"
import type { BackgroundType } from "./BackgroundSelector"

interface BackgroundSwitcherProps {
    onBackgroundChange?: (bg: BackgroundType) => void
}

export function BackgroundSwitcher({ onBackgroundChange }: BackgroundSwitcherProps) {
    const [activeBackground, setActiveBackground] = useState<BackgroundType>('neural')

    const backgrounds = [
        {
            id: 'grid' as BackgroundType,
            name: 'Grid',
            icon: Grid3x3,
            description: 'Cyberpunk grid terrain',
            color: 'from-cyan-500 to-pink-500'
        },
        {
            id: 'neural' as BackgroundType,
            name: 'Neural',
            icon: Brain,
            description: 'AI neural network',
            color: 'from-violet-500 to-indigo-500'
        },
        {
            id: 'orbital' as BackgroundType,
            name: 'Orbital',
            icon: Orbit,
            description: 'Space spheres',
            color: 'from-sky-400 to-indigo-400'
        },
        {
            id: 'particle' as BackgroundType,
            name: 'Particle',
            icon: Sparkles,
            description: 'Floating particles',
            color: 'from-slate-400 to-slate-600'
        },
        {
            id: 'three' as BackgroundType,
            name: 'Interactive',
            icon: Boxes,
            description: 'Mouse parallax',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            id: 'none' as BackgroundType,
            name: 'None',
            icon: X,
            description: 'No background',
            color: 'from-gray-500 to-gray-700'
        },
    ]

    useEffect(() => {
        const saved = localStorage.getItem('preferred-background') as BackgroundType
        if (saved) {
            setActiveBackground(saved)
        }
    }, [])

    const handleCycleBackground = () => {
        const currentIndex = backgrounds.findIndex(b => b.id === activeBackground)
        const nextIndex = (currentIndex + 1) % backgrounds.length
        const nextBackground = backgrounds[nextIndex].id

        setActiveBackground(nextBackground)
        localStorage.setItem('preferred-background', nextBackground)
        onBackgroundChange?.(nextBackground)

        // Dispatch custom event for same-tab sync
        window.dispatchEvent(new CustomEvent('backgroundChange', { detail: nextBackground }))

        // Trigger global background change
        if ((window as any).setBackground) {
            (window as any).setBackground(nextBackground)
        }
    }

    const activeConfig = backgrounds.find(b => b.id === activeBackground)

    return (
        <button
            onClick={handleCycleBackground}
            className="fixed bottom-6 right-6 z-50 group glass-panel px-5 py-4 rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            title={`Current: ${activeConfig?.name} - Click to cycle`}
        >
            <div className="flex items-center gap-3">
                {activeConfig && (
                    <>
                        <activeConfig.icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <div className="flex flex-col items-start">
                            <span className="text-xs font-medium opacity-60">Background</span>
                            <span className="text-sm font-bold">{activeConfig.name}</span>
                        </div>
                    </>
                )}
            </div>

            {/* Indicator dot with gradient */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${activeConfig?.color} animate-pulse shadow-lg`} />

            {/* Click hint */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="text-xs font-semibold bg-black/80 text-white px-3 py-1 rounded-lg">
                    Click to cycle
                </div>
            </div>
        </button>
    )
}
