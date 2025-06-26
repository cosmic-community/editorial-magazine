'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

export default function Header({ siteSettings }: HeaderProps) {
  const [scrollOpacity, setScrollOpacity] = useState(0.95)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 200
      
      // Start more transparent and fade in slightly on scroll
      const opacity = Math.min(0.98, 0.85 + (scrollY / maxScroll) * 0.13)
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className="fixed top-0 right-0 z-50 transition-all duration-500 ease-out"
      style={{ 
        backgroundColor: `rgba(255, 255, 255, ${scrollOpacity})`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="p-6 sm:p-8">
        <Link 
          href="/" 
          className="group block"
        >
          {siteSettings?.metadata?.logo ? (
            <img 
              src={`${siteSettings.metadata.logo.imgix_url}?w=240&h=60&fit=crop&auto=format,compress`}
              alt="Cosmic Signal"
              width={120}
              height={30}
              className="h-8 w-auto transition-all duration-300 group-hover:scale-105 group-hover:opacity-80 filter drop-shadow-sm"
            />
          ) : (
            <div className="text-right">
              <h1 className="text-2xl sm:text-3xl font-serif font-light text-gray-900 transition-all duration-300 group-hover:text-gray-600 tracking-tight">
                Cosmic
              </h1>
              <div className="text-sm sm:text-base font-mono font-medium text-gray-500 tracking-widest uppercase mt-1 transition-all duration-300 group-hover:text-gray-400">
                Signal
              </div>
            </div>
          )}
        </Link>
      </div>
    </header>
  )
}