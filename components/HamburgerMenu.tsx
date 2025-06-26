'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="z-50 relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
        aria-label="Toggle menu"
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
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Slide-out Menu Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="pt-20 pb-8 px-6">
          <nav className="space-y-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={closeMenu}
              className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}