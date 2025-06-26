'use client'

import { useEffect, useRef, useState } from 'react'
import { Article } from '@/types'
import BlogSlide from '@/components/BlogSlide'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface ScrollingBlogLayoutProps {
  articles: Article[]
}

export default function ScrollingBlogLayout({ articles }: ScrollingBlogLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollProgress = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = window.scrollY
      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate which slide should be active based on scroll position
      const relativeScroll = scrollTop - containerTop
      const slideHeight = windowHeight
      const activeSlide = Math.floor(relativeScroll / slideHeight)

      // Clamp to valid range
      const clampedSlide = Math.max(0, Math.min(articles.length - 1, activeSlide))
      
      if (clampedSlide !== currentSlide) {
        setCurrentSlide(clampedSlide)
      }

      // Check if we're actively scrolling through the blog section
      const isInBlogSection = scrollTop >= containerTop && 
                             scrollTop <= containerTop + containerHeight - windowHeight
      setIsScrolling(isInBlogSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [articles.length, currentSlide])

  if (!articles.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">No articles found.</p>
      </div>
    )
  }

  return (
    <>
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="fixed top-6 right-6 z-40 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentSlide + 1} / {articles.length}
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${articles.length * 100}vh` }}
      >
        {/* Fixed Viewport */}
        <div className="fixed inset-0 overflow-hidden">
          {articles.map((article, index) => (
            <BlogSlide
              key={article.id}
              article={article}
              index={index}
              currentSlide={currentSlide}
              isActive={index === currentSlide}
              isScrolling={isScrolling}
              totalArticles={articles.length}
            />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (containerRef.current) {
                  const slidePosition = containerRef.current.offsetTop + (index * window.innerHeight)
                  window.scrollTo({
                    top: slidePosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}