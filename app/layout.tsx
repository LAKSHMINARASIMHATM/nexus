import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Using Archivo (Expanded variant not directly available in google fonts package sometimes, 
// using generic Archivo if needed or stick to manual if specific weights purely needed. 
// Assuming Archivo Black or similar for "Expanded" feel, or we can use custom local fonts if strictly needed.
// For now, let's stick to standard available Google Fonts in Next.js to optimize loading.)
// Note: Archivo Expanded is not a standard export. We will use a standard wide font or keep local if needed.
// However, to fix loading, let's use standard fonts that match the design intent.
// "Archivo Expanded" is not in next/font/google by default under that name. 
// We will use standard Archivo and set width axis if supported, or just use a standard display font.
// Let's use 'Archivo' with axes.
// Actually, let's keep it simple and safe for now: Use Inter for body, and maybe Oswald/Bebas for display if available.
// The user asks to fix loading. 

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexus',
  description: 'Powered by truth.',
  generator: 'Nexus',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${plexMono.variable}`}>
      <head>
        {/* Removed blocking Google Fonts links */}
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
