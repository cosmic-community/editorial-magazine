'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories, getPages } from '@/lib/cosmic'
import { Category, Page } from '@/types'

export default function Navigation() {
  const [categories, setCategories] = useState<Category[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    async function loadNavigation() {
      try {
        const [categoriesData, pagesData] = await Promise.all([
          getCategories(),
          getPages()
        ])
        
        setCategories(categoriesData)
        setPages(pagesData.filter(page => page.metadata?.show_in_nav))
      } catch (error) {
        console.error('Error loading navigation:', error)
      }
    }

    loadNavigation()
  }, [])

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {category.metadata?.name || category.title}
          </Link>
        ))}
        
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/${page.slug}`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {page.metadata?.page_title || page.title}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden flex flex-col space-y-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-foreground transition-transform ${
          isMobileOpen ? 'rotate-45 translate-y-2' : ''
        }`} />
        <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${
          isMobileOpen ? 'opacity-0' : ''
        }`} />
        <span className={`block w-6 h-0.5 bg-foreground transition-transform ${
          isMobileOpen ? '-rotate-45 -translate-y-2' : ''
        }`} />
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
            
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`/${page.slug}`}
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {page.metadata?.page_title || page.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}