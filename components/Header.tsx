'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'
import HamburgerMenu from '@/components/HamburgerMenu'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

export default function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu */}
          <HamburgerMenu />

          {/* Logo / Site Name - Centered */}
          <Link href="/" className="flex items-center space-x-3 group absolute left-1/2 transform -translate-x-1/2">
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
    </header>
  )
}