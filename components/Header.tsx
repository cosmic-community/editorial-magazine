'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'
import HamburgerMenu from '@/components/HamburgerMenu'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

export default function Header({ siteSettings }: HeaderProps) {
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 200 // Adjust this value to control how quickly it becomes transparent
      
      // Calculate opacity: starts at 1, decreases as you scroll down
      // Minimum opacity is 0.8 to ensure header remains visible
      const opacity = Math.max(0.8, 1 - (scrollY / maxScroll) * 0.2)
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-gray-200"
      style={{ 
        backgroundColor: `rgba(255, 255, 255, ${scrollOpacity})`,
        backdropFilter: scrollOpacity < 1 ? 'blur(8px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Empty space for hamburger menu - it's now positioned fixed */}
          <div className="w-10 h-10" />

          {/* Logo / Site Name - Centered */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group absolute left-1/2 transform -translate-x-1/2"
          >
            {siteSettings?.metadata?.logo ? (
              <img 
                src={`${siteSettings.metadata.logo.imgix_url}?w=160&h=50&fit=crop&auto=format,compress`}
                alt={siteSettings?.metadata?.site_name || 'Logo'}
                width={160}
                height={50}
                className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <h1 className="text-2xl font-serif font-bold text-gray-900 transition-colors duration-200 group-hover:text-gray-700">
                {siteSettings?.metadata?.site_name || 'Editorial'}
              </h1>
            )}
          </Link>

          {/* Right side - placeholder for balance */}
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Hamburger Menu - positioned independently */}
      <HamburgerMenu />
    </header>
  )
}