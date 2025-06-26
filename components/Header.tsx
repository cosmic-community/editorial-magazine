'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'
import Navigation from '@/components/Navigation'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

export default function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm border-b border-border shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site Name */}
          <Link href="/" className="flex items-center space-x-3">
            {siteSettings?.metadata?.logo ? (
              <img 
                src={`${siteSettings.metadata.logo.imgix_url}?w=120&h=40&fit=crop&auto=format,compress`}
                alt={siteSettings?.metadata?.site_name || 'Logo'}
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            ) : (
              <h1 className="text-2xl font-serif font-medium">
                {siteSettings?.metadata?.site_name || 'Editorial'}
              </h1>
            )}
          </Link>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  )
}