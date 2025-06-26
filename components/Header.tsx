// components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'
import Navigation from '@/components/Navigation'
import HamburgerMenu from '@/components/HamburgerMenu'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

export default function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 0)
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-border shadow-sm' 
          : 'bg-white'
      } ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
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
                <h1 
                  className="text-2xl font-serif font-medium"
                  style={{
                    lineHeight: '1.3',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem'
                  }}
                >
                  {siteSettings?.metadata?.site_name || 'Editorial'}
                </h1>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <Navigation />
            </div>

            {/* Mobile Menu Button - Only show on small screens */}
            <div className="md:hidden">
              <HamburgerMenu siteSettings={siteSettings} />
            </div>
          </div>
        </div>
      </header>

      {/* Persistent Hamburger Menu - Always visible when header is hidden */}
      <div className={`fixed top-4 left-4 z-50 transition-all duration-300 ${
        !isHeaderVisible && isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <HamburgerMenu siteSettings={siteSettings} isPersistent={true} />
      </div>
    </>
  )
}