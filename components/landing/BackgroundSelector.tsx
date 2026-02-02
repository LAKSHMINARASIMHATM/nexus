"use client"

import { useState, useEffect } from "react"
import { GridBackground } from "./GridBackground"
import { NeuralBackground } from "./NeuralBackground"
import { OrbitalBackground } from "./OrbitalBackground"
import { ParticleBackground } from "./ParticleBackground"
import { ThreeBackground } from "./ThreeBackground"

export type BackgroundType = 'grid' | 'neural' | 'orbital' | 'particle' | 'three' | 'none'

interface BackgroundSelectorProps {
    defaultBackground?: BackgroundType
    onChange?: (background: BackgroundType) => void
}

export function BackgroundSelector({ defaultBackground = 'neural', onChange }: BackgroundSelectorProps) {
    const [activeBackground, setActiveBackground] = useState<BackgroundType>(defaultBackground)

    useEffect(() => {
        // Load saved preference from localStorage
        const saved = localStorage.getItem('preferred-background') as BackgroundType
        if (saved) {
            setActiveBackground(saved)
        }
    }, [])

    const handleBackgroundChange = (bg: BackgroundType) => {
        setActiveBackground(bg)
        localStorage.setItem('preferred-background', bg)
        onChange?.(bg)
    }

    // Expose method globally for external control and keep it updated
    useEffect(() => {
        (window as any).setBackground = handleBackgroundChange
    }, [onChange]) // Update when onChange prop changes

    // Listen to storage events for cross-tab/component sync
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'preferred-background' && e.newValue) {
                setActiveBackground(e.newValue as BackgroundType)
            }
        }

        // Custom event for same-tab changes
        const handleCustomChange = (e: CustomEvent) => {
            setActiveBackground(e.detail as BackgroundType)
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('backgroundChange' as any, handleCustomChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('backgroundChange' as any, handleCustomChange)
        }
    }, [])

    return (
        <>
            {activeBackground === 'grid' && <GridBackground />}
            {activeBackground === 'neural' && <NeuralBackground />}
            {activeBackground === 'orbital' && <OrbitalBackground />}
            {activeBackground === 'particle' && <ParticleBackground />}
            {activeBackground === 'three' && <ThreeBackground />}
            {activeBackground === 'none' && null}
        </>
    )
}
