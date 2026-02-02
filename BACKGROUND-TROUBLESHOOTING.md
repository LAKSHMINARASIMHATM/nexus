## 🔍 Background Troubleshooting Guide

If backgrounds aren't showing, follow these steps:

### 1. Check Browser Console

Open Developer Tools (F12) and look for:
- `ParticleBackground mounting...` - Component is loading
- `ParticleBackground canvas added to DOM` - Canvas created successfully
- Any WebGL errors or Three.js errors

### 2. Check if Canvas Exists in DOM

In Developer Tools → Elements tab, look for:
```html
<div class="fixed top-0 left-0 w-full h-full" style="z-index: -10;">
  <canvas>...</canvas>
</div>
```

### 3. Common Issues & Fixes

#### Issue: No background visible
**Fix:** The parent page might have a solid background covering it
- Check landing page doesn't have `bg-white` without transparency
- Ensure z-index layers are correct

#### Issue: WebGL context error
**Fix:** Too many WebGL contexts
- Close other tabs with 3D content
- Refresh the page
- Switch to a different background theme

#### Issue: Background changes but doesn't render
**Fix:** Component sync issue
- Clear localStorage: `localStorage.clear()`
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### 4. Manual Test

Open browser console and run:
```javascript
// Check if background is set
console.log(localStorage.getItem('preferred-background'))

// Manually trigger background change
if (window.setBackground) {
  window.setBackground('neural')
}

// Check if custom event works
window.dispatchEvent(new CustomEvent('backgroundChange', { detail: 'grid' }))
```

### 5. Verify Three.js is Loaded

```javascript
console.log(typeof THREE) // Should be 'object', not 'undefined'
```

### 6. Quick Visual Test

Try the `/backgrounds` demo page which has clickable cards:
```
http://localhost:3000/backgrounds
```

### 7. Default Background

The landing page is set to start with `particle` background by default. To change:

In `app/landing/page.tsx`:
```tsx
<BackgroundSelector defaultBackground="neural" /> <!-- Change this -->
```

### 8. Network Check

Make sure your dev server is running:
```bash
npm run dev
```

Then visit: `http://localhost:3000/landing`

### 9. Clear Cache

If issues persist:
1. Open DevTools → Application → Storage
2. Clear all site data
3. Hard refresh the page

### 10. Fallback: Use Single Background

If the switcher isn't working, use a single background directly:

```tsx
import { NeuralBackground } from '@/components/landing'

//  In your page component:
<NeuralBackground />
```
