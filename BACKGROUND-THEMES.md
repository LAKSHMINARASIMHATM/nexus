# 🎨 Background Themes Documentation

This project includes **5 stunning animated 3D background themes** built with Three.js, plus a complete theme switching system.

## 🌟 Available Backgrounds

### 1. Grid Background (`grid`)
- **Visual**: Retro cyberpunk grid with moving terrain
- **Colors**: Cyan & Pink grid, Indigo wireframe
- **Theme**: Dark (`#020617`)
- **Animation**: Moving grid creating depth, camera sway
- **Performance**: ⚡⚡⚡ High (0 particles)
- **Use Case**: Futuristic/tech landing pages

### 2. Neural Background (`neural`) 
- **Visual**: AI neural network with connected particles
- **Colors**: Violet particles, Indigo connections
- **Theme**: Dark gradient (slate-950 → indigo-950)
- **Animation**: 100 bouncing particles with dynamic connections
- **Interaction**: Mouse tracking for 3D parallax
- **Performance**: ⚡⚡ Medium
- **Use Case**: AI/ML products, data visualization

### 3. Orbital Background (`orbital`)
- **Visual**: Planetary spheres with particle ring
- **Colors**: Sky-400 & Indigo-400
- **Theme**: Dark (`#0f172a`)
- **Animation**: Counter-rotating icosahedrons, 500 orbital particles
- **Performance**: ⚡⚡⚡ High
- **Use Case**: Space tech, astronomy apps

### 4. Particle Background (`particle`)
- **Visual**: Minimalist floating particles
- **Colors**: Slate-500 on light background
- **Theme**: Light (`#f8fafc`)
- **Animation**: 1000 particles drifting upward
- **Performance**: ⚡⚡ Medium
- **Use Case**: Clean/minimal designs, light mode

### 5. Interactive Background (`three`)
- **Visual**: Dense particle cloud
- **Colors**: Indigo-600
- **Theme**: Transparent (adapts to any theme)
- **Animation**: 2000 particles with rotation
- **Interaction**: Mouse parallax effect
- **Performance**: ⚡ Lower
- **Use Case**: Interactive portfolios

## 🚀 Quick Start

### Already Integrated!

The background theme system is **already live** on your landing page at `/landing`! 

Visit your site and you'll see a floating button in the bottom-right corner. Click it to switch between all 5 background themes instantly.

### Basic Usage (Single Background)

```tsx
import { NeuralBackground } from '@/components/landing'

export default function Page() {
  return (
    <main>
      <NeuralBackground />
      <YourContent />
    </main>
  )
}
```

### Advanced Usage (Background Switcher)

```tsx
import { BackgroundSelector, BackgroundSwitcher } from '@/components/landing'

export default function Page() {
  return (
    <main>
      {/* Background renderer */}
      <BackgroundSelector defaultBackground="neural" />
      
      {/* UI control for switching */}
      <BackgroundSwitcher />
      
      <YourContent />
    </main>
  )
}
```

## 🎛️ Components API

### `<BackgroundSelector>`

Manages which background is currently active.

**Props:**
- `defaultBackground?: BackgroundType` - Initial background (default: `'neural'`)
- `onChange?: (bg: BackgroundType) => void` - Callback when background changes

**Features:**
- Persists selection to `localStorage`
- Exposes `window.setBackground(type)` for programmatic control

**Example:**
```tsx
<BackgroundSelector 
  defaultBackground="orbital"
  onChange={(bg) => console.log('Switched to:', bg)}
/>
```

### `<BackgroundSwitcher>`

Floating UI control for switching backgrounds.

**Props:**
- `onBackgroundChange?: (bg: BackgroundType) => void` - Callback when user selects a background

**Features:**
- Elegant floating button (bottom-right)
- Visual panel with icons and descriptions
- Auto-saves preference to localStorage
- Smooth animations

**Example:**
```tsx
<BackgroundSwitcher 
  onBackgroundChange={(bg) => trackAnalytics('background_change', bg)}
/>
```

## 🎯 Background Types

```typescript
type BackgroundType = 
  | 'grid'      // Cyberpunk grid
  | 'neural'    // AI neural network
  | 'orbital'   // Space spheres
  | 'particle'  // Floating particles
  | 'three'     // Interactive parallax
  | 'none'      // No background
```

## ⚙️ Programmatic Control

You can control the background via JavaScript:

```typescript
// Change background programmatically
window.setBackground('orbital')

// Get current background
const current = localStorage.getItem('preferred-background')
```

## 🎨 Customization

### Change Default Background

In your page component:
```tsx
<BackgroundSelector defaultBackground="grid" />
```

### Hide Switcher UI

Just use `BackgroundSelector` without `BackgroundSwitcher`:
```tsx
<BackgroundSelector defaultBackground="neural" />
```

### Create Custom Background

1. Create a new component in `components/landing/YourBackground.tsx`
2. Follow the pattern of existing backgrounds (use Three.js)
3. Add to `BackgroundSelector.tsx`:

```tsx
import { YourBackground } from "./YourBackground"

// In the component:
{activeBackground === 'custom' && <YourBackground />}
```

4. Add to `BackgroundSwitcher.tsx` backgrounds array

## 🔧 Technical Details

### All backgrounds:
- Use **Three.js** for 3D rendering
- Positioned as `fixed` with `z-index: -10` (behind content)
- Auto-cleanup on unmount (prevents memory leaks)
- Responsive (auto-resize on window resize)
- Client-side only (`"use client"`)

### Performance Tips:
- `grid`, `orbital`: Best performance (simple geometries)
- `neural`, `particle`: Medium (moderate particle count)
- `three`: Lower performance (2000 particles + interactions)

### Browser Compatibility:
- Requires WebGL support
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation if WebGL unavailable

## 📦 Complete Example

```tsx
'use client'

import { BackgroundSelector, BackgroundSwitcher } from '@/components/landing'
import { useState } from 'react'

export default function HomePage() {
  const [currentBg, setCurrentBg] = useState<string>('neural')

  return (
    <main className="min-h-screen relative">
      {/* Background system */}
      <BackgroundSelector 
        defaultBackground="neural"
        onChange={(bg) => {
          setCurrentBg(bg)
          console.log('Background changed to:', bg)
        }}
      />
      
      {/* Switcher UI */}
      <BackgroundSwitcher />
      
      {/* Your content */}
      <div className="relative z-10 container mx-auto p-8">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to Nexus
        </h1>
        <p className="text-xl opacity-80">
          Current background: {currentBg}
        </p>
      </div>
    </main>
  )
}
```

## 🎪 Demo

Run your dev server and navigate to any page with the background system:

```bash
npm run dev
```

Click the floating button in the bottom-right to switch between themes!

## 📝 Notes

- User preferences persist across sessions (localStorage)
- All backgrounds are optimized for performance
- Mouse interactions work on `neural` and `three` backgrounds
- Use `none` type to disable backgrounds temporarily

---

**Built with ❤️ using Three.js and React**
