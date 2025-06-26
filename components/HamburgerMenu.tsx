'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Close menu on route changes or when clicking outside
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest('[data-hamburger-menu]')) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div data-hamburger-menu>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-[70] w-10 h-10 flex items-center justify-center bg-white text-gray-700 hover:text-gray-900 transition-all duration-200 rounded-md shadow-lg hover:shadow-xl border border-gray-200"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        style={{ position: 'fixed' }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[65] backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
          style={{ position: 'fixed' }}
        />
      )}

      {/* Slide-out Menu Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[66] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ position: 'fixed' }}
      >
        <div className="pt-20 pb-8 px-6 h-full overflow-y-auto">
          <nav className="space-y-6" role="navigation">
            <Link
              href="/"
              onClick={closeMenu}
              className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={closeMenu}
              className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Categories
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block text-xl font-semibrand text-gray-900 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}