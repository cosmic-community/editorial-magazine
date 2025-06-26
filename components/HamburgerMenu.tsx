'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'

interface HamburgerMenuProps {
  siteSettings: SiteSettings | null
  isPersistent?: boolean
}

export default function HamburgerMenu({ siteSettings, isPersistent = false }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/authors', label: 'Authors' },
    { href: '/about', label: 'About' },
  ]

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
          isPersistent 
            ? 'bg-white/90 backdrop-blur-sm shadow-lg border border-border hover:bg-white hover:shadow-xl' 
            : 'hover:bg-muted'
        } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="relative w-5 h-5">
          <span 
            className={`absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? 'top-2 rotate-45' : 'top-1'
            }`}
          />
          <span 
            className={`absolute left-0 top-2 w-5 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? 'top-2 -rotate-45' : 'top-3'
            }`}
          />
        </div>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Menu Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              {siteSettings?.metadata?.logo ? (
                <img 
                  src={`${siteSettings.metadata.logo.imgix_url}?w=100&h=32&fit=crop&auto=format,compress`}
                  alt={siteSettings?.metadata?.site_name || 'Logo'}
                  width={100}
                  height={32}
                  className="h-6 w-auto"
                />
              ) : (
                <h2 className="text-lg font-serif font-medium">
                  {siteSettings?.metadata?.site_name || 'Editorial'}
                </h2>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-lg font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {siteSettings?.metadata?.tagline || 'A modern editorial experience'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}