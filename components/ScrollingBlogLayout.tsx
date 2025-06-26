'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const scrollProgress = useScrollProgress()
  const lastWheelTimeRef = useRef(0)
  const wheelDeltaRef = useRef(0)

  const scrollToSlide = useCallback((slideIndex: number, smooth = true) => {
    if (!containerRef.current || isTransitioning) return
    
    const clampedIndex = Math.max(0, Math.min(articles.length - 1, slideIndex))
    const slidePosition = containerRef.current.offsetTop + (clampedIndex * window.innerHeight)
    
    setIsTransitioning(true)
    window.scrollTo({
      top: slidePosition,
      behavior: smooth ? 'smooth' : 'auto'
    })

    // Reset transitioning state after animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }, [articles.length, isTransitioning])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || isTransitioning) return

    const now = Date.now()
    const timeDelta = now - lastWheelTimeRef.current
    
    // Accumulate wheel delta for smoother detection
    wheelDeltaRef.current += e.deltaY
    lastWheelTimeRef.current = now

    // Reset accumulated delta if there's a pause in scrolling
    if (timeDelta > 150) {
      wheelDeltaRef.current = e.deltaY
    }

    // Only trigger snap scrolling if we're in the blog section
    const scrollTop = window.scrollY
    const containerTop = containerRef.current.offsetTop
    const containerHeight = containerRef.current.offsetHeight
    const windowHeight = window.innerHeight
    
    const isInBlogSection = scrollTop >= containerTop - windowHeight * 0.1 && 
                           scrollTop <= containerTop + containerHeight - windowHeight * 0.9

    if (!isInBlogSection) return

    e.preventDefault()

    // Threshold for triggering slide change
    const threshold = 100

    if (Math.abs(wheelDeltaRef.current) > threshold) {
      if (wheelDeltaRef.current > 0 && currentSlide < articles.length - 1) {
        // Scroll down
        setCurrentSlide(prev => prev + 1)
        scrollToSlide(currentSlide + 1)
      } else if (wheelDeltaRef.current < 0 && currentSlide > 0) {
        // Scroll up  
        setCurrentSlide(prev => prev - 1)
        scrollToSlide(currentSlide - 1)
      }
      wheelDeltaRef.current = 0
    }
  }, [currentSlide, articles.length, isTransitioning, scrollToSlide])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioning) return

    switch (e.key) {
      case 'ArrowDown':
      case ' ':
        e.preventDefault()
        if (currentSlide < articles.length - 1) {
          setCurrentSlide(prev => prev + 1)
          scrollToSlide(currentSlide + 1)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
          scrollToSlide(currentSlide - 1)
        }
        break
      case 'Home':
        e.preventDefault()
        setCurrentSlide(0)
        scrollToSlide(0)
        break
      case 'End':
        e.preventDefault()
        setCurrentSlide(articles.length - 1)
        scrollToSlide(articles.length - 1)
        break
    }
  }, [currentSlide, articles.length, isTransitioning, scrollToSlide])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isTransitioning) return

      const scrollTop = window.scrollY
      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate which slide should be active based on scroll position
      const relativeScroll = scrollTop - containerTop
      const slideHeight = windowHeight
      const activeSlide = Math.floor(relativeScroll / slideHeight + 0.5) // Add 0.5 for better snapping

      // Clamp to valid range
      const clampedSlide = Math.max(0, Math.min(articles.length - 1, activeSlide))
      
      if (clampedSlide !== currentSlide && !isTransitioning) {
        setCurrentSlide(clampedSlide)
      }

      // Check if we're actively scrolling through the blog section
      const isInBlogSection = scrollTop >= containerTop && 
                             scrollTop <= containerTop + containerHeight - windowHeight
      setIsScrolling(isInBlogSection)
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [articles.length, currentSlide, isTransitioning, handleWheel, handleKeyDown])

  // Touch/swipe support for mobile
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return
      
      touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const threshold = 50

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && currentSlide < articles.length - 1) {
          // Swipe up - next slide
          setCurrentSlide(prev => prev + 1)
          scrollToSlide(currentSlide + 1)
        } else if (deltaY < 0 && currentSlide > 0) {
          // Swipe down - previous slide
          setCurrentSlide(prev => prev - 1)
          scrollToSlide(currentSlide - 1)
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSlide, articles.length, isTransitioning, scrollToSlide])

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
          style={{ width: `${((currentSlide + 1) / articles.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="fixed top-6 right-6 z-40 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentSlide + 1} / {articles.length}
      </div>

      {/* Instructions */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
        <span>Scroll or use arrow keys to navigate</span>
        <div className="flex gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">↑</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">↓</kbd>
        </div>
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative snap-container"
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
                if (!isTransitioning) {
                  setCurrentSlide(index)
                  scrollToSlide(index)
                }
              }}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            if (currentSlide > 0 && !isTransitioning) {
              setCurrentSlide(prev => prev - 1)
              scrollToSlide(currentSlide - 1)
            }
          }}
          disabled={currentSlide === 0 || isTransitioning}
          className="fixed left-1/2 top-6 transform -translate-x-1/2 z-40 bg-black/80 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/90 transition-colors"
          aria-label="Previous article"
        >
          ↑
        </button>

        <button
          onClick={() => {
            if (currentSlide < articles.length - 1 && !isTransitioning) {
              setCurrentSlide(prev => prev + 1)
              scrollToSlide(currentSlide + 1)
            }
          }}
          disabled={currentSlide === articles.length - 1 || isTransitioning}
          className="fixed left-1/2 bottom-20 transform -translate-x-1/2 z-40 bg-black/80 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/90 transition-colors"
          aria-label="Next article"
        >
          ↓
        </button>
      </div>
    </>
  )
}