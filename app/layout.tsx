import { Inter } from 'next/font/google'
import { getSiteSettings } from '@/lib/cosmic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: siteSettings?.metadata?.site_name || 'Editorial Magazine',
    description: siteSettings?.metadata?.tagline || 'Stories that matter, perspectives that inspire',
    icons: {
      icon: siteSettings?.metadata?.favicon?.url || '/favicon.ico',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {siteSettings?.metadata?.accent_color && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                :root {
                  --primary: ${hexToHsl(siteSettings.metadata.accent_color)};
                }
              `,
            }}
          />
        )}
      </head>
      <body className="font-sans antialiased">
        <Header siteSettings={siteSettings} />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  )
}

// Helper function to convert hex to HSL
function hexToHsl(hex: string): string {
  // Remove the hash if present
  hex = hex.replace('#', '')
  
  // Parse the hex values
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}