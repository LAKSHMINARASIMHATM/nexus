'use client'

import { useState, useEffect } from 'react'
import { BackgroundSelector, BackgroundSwitcher, type BackgroundType } from '@/components/landing'

export default function BackgroundDemo() {
    const [activeBackground, setActiveBackground] = useState<BackgroundType>('neural')

    // Load saved preference on mount
    useEffect(() => {
        const saved = localStorage.getItem('preferred-background') as BackgroundType
        if (saved) {
            setActiveBackground(saved)
        }
    }, [])

    const handleBackgroundChange = (bg: BackgroundType) => {
        setActiveBackground(bg)
        localStorage.setItem('preferred-background', bg)

        // Trigger global background change
        if ((window as any).setBackground) {
            (window as any).setBackground(bg)
        }
    }

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Background system - handles rendering */}
            <BackgroundSelector
                defaultBackground="neural"
                onChange={setActiveBackground}
            />

            {/* UI control for switching backgrounds */}
            <BackgroundSwitcher onBackgroundChange={setActiveBackground} />

            {/* Demo content */}
            <div className="relative z-10 container mx-auto px-8 py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                        <h1 className="text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            Background Themes
                        </h1>
                        <p className="text-2xl opacity-80 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                            Experience 5 stunning 3D animated backgrounds
                        </p>
                        <p className="text-lg opacity-60 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                            👆 Click any card below to switch themes instantly!
                        </p>
                    </div>

                    {/* Features Grid - Now Clickable */}
                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        {[
                            {
                                id: 'grid' as BackgroundType,
                                title: 'Grid',
                                desc: 'Cyberpunk terrain with moving grid',
                                icon: '🌐',
                                color: 'from-cyan-500/20 to-pink-500/20',
                                activeColor: 'from-cyan-500 to-pink-500'
                            },
                            {
                                id: 'neural' as BackgroundType,
                                title: 'Neural',
                                desc: 'AI network with connected particles',
                                icon: '🧠',
                                color: 'from-violet-500/20 to-indigo-500/20',
                                activeColor: 'from-violet-500 to-indigo-500'
                            },
                            {
                                id: 'orbital' as BackgroundType,
                                title: 'Orbital',
                                desc: 'Space spheres with particle ring',
                                icon: '🪐',
                                color: 'from-sky-400/20 to-indigo-400/20',
                                activeColor: 'from-sky-400 to-indigo-400'
                            },
                            {
                                id: 'particle' as BackgroundType,
                                title: 'Particle',
                                desc: 'Minimalist floating particles',
                                icon: '✨',
                                color: 'from-slate-400/20 to-slate-600/20',
                                activeColor: 'from-slate-400 to-slate-600'
                            },
                            {
                                id: 'three' as BackgroundType,
                                title: 'Interactive',
                                desc: 'Mouse parallax particle cloud',
                                icon: '🎨',
                                color: 'from-indigo-500/20 to-purple-500/20',
                                activeColor: 'from-indigo-500 to-purple-500'
                            },
                            {
                                id: 'none' as BackgroundType,
                                title: 'None',
                                desc: 'Disable background animations',
                                icon: '⭕',
                                color: 'from-gray-500/20 to-gray-700/20',
                                activeColor: 'from-gray-500 to-gray-700'
                            },
                        ].map((feature, idx) => {
                            const isActive = activeBackground === feature.id

                            return (
                                <button
                                    key={feature.title}
                                    onClick={() => handleBackgroundChange(feature.id)}
                                    className={`glass-panel p-6 rounded-2xl transition-all duration-300 group text-left relative overflow-hidden ${isActive
                                            ? 'scale-105 shadow-2xl ring-2 ring-white/30'
                                            : 'hover:scale-[1.02] hover:shadow-xl'
                                        }`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {/* Active indicator glow */}
                                    {isActive && (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.activeColor} opacity-10 animate-pulse`} />
                                    )}

                                    {/* Content */}
                                    <div className="relative">
                                        <div className={`text-4xl mb-3 bg-gradient-to-br ${isActive ? feature.activeColor : feature.color} w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold">{feature.title}</h3>
                                            {isActive && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    <span className="text-xs font-semibold text-green-500">Active</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="opacity-70">{feature.desc}</p>
                                    </div>

                                    {/* Click hint */}
                                    {!isActive && (
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-xs font-semibold bg-white/10 px-2 py-1 rounded">
                                                Click to activate
                                            </div>
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-4 animate-in fade-in duration-1000 delay-700">
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-bold mb-2">💾 Auto-Save</h3>
                            <p className="opacity-80">Your theme preference is saved to localStorage and persists across sessions</p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-bold mb-2">⚡ Performance</h3>
                            <p className="opacity-80">All backgrounds are optimized with proper cleanup to prevent memory leaks</p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-bold mb-2">🎯 Mouse Interaction</h3>
                            <p className="opacity-80">Try the <strong>Neural</strong> and <strong>Interactive</strong> backgrounds - they respond to your mouse movement!</p>
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="glass-panel p-6 rounded-2xl animate-in fade-in duration-1000 delay-1000">
                        <h3 className="text-lg font-bold mb-4">📝 Usage Example</h3>
                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`import { BackgroundSelector, BackgroundSwitcher } from '@/components/landing'

export default function Page() {
  return (
    <main>
      <BackgroundSelector defaultBackground="neural" />
      <BackgroundSwitcher />
      <YourContent />
    </main>
  )
}`}</code>
                        </pre>
                    </div>

                    {/* Footer */}
                    <div className="text-center opacity-60 text-sm animate-in fade-in duration-1000 delay-1200">
                        <p>Built with Three.js, React, and lots of ✨</p>
                        <p className="mt-2">Check <code className="px-2 py-1 bg-white/10 rounded">BACKGROUND-THEMES.md</code> for full documentation</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
