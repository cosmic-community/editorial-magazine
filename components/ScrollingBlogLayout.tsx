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
  const [showFooterTransition, setShowFooterTransition] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false) // New state to track manual navigation
  const scrollProgress = useScrollProgress()
  const lastWheelTimeRef = useRef(0)
  const wheelDeltaRef = useRef(0)

  const scrollToSlide = useCallback((slideIndex: number, smooth = true) => {
    if (!containerRef.current || isTransitioning) return
    
    const clampedIndex = Math.max(0, Math.min(articles.length - 1, slideIndex))
    const slidePosition = containerRef.current.offsetTop + (clampedIndex * window.innerHeight)
    
    setIsTransitioning(true)
    setIsNavigating(true) // Mark as manual navigation
    setCurrentSlide(clampedIndex) // Update current slide immediately
    setShowFooterTransition(false) // Reset footer transition when navigating to slide
    
    window.scrollTo({
      top: slidePosition,
      behavior: smooth ? 'smooth' : 'auto'
    })

    // Reset transitioning and navigation state after animation
    setTimeout(() => {
      setIsTransitioning(false)
      setIsNavigating(false) // Reset navigation flag
    }, 800)
  }, [articles.length, isTransitioning])

  const scrollToFooter = useCallback(() => {
    if (!containerRef.current || isTransitioning) return
    
    setIsTransitioning(true)
    setIsNavigating(true) // Mark as manual navigation
    setShowFooterTransition(true)
    
    // Calculate footer position (after all slides)
    const footerPosition = containerRef.current.offsetTop + (articles.length * window.innerHeight)
    
    window.scrollTo({
      top: footerPosition,
      behavior: 'smooth'
    })

    setTimeout(() => {
      setIsTransitioning(false)
      setIsNavigating(false) // Reset navigation flag
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
      if (wheelDeltaRef.current > 0) {
        // Scroll down
        if (currentSlide < articles.length - 1) {
          const nextSlide = currentSlide + 1
          setCurrentSlide(nextSlide)
          scrollToSlide(nextSlide)
        } else {
          // At last slide, scroll to footer
          scrollToFooter()
        }
      } else if (wheelDeltaRef.current < 0 && currentSlide > 0) {
        // Scroll up  
        const prevSlide = currentSlide - 1
        setCurrentSlide(prevSlide)
        scrollToSlide(prevSlide)
        setShowFooterTransition(false)
      }
      wheelDeltaRef.current = 0
    }
  }, [currentSlide, articles.length, isTransitioning, scrollToSlide, scrollToFooter])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioning) return

    switch (e.key) {
      case 'ArrowDown':
      case ' ':
        e.preventDefault()
        if (currentSlide < articles.length - 1) {
          const nextSlide = currentSlide + 1
          setCurrentSlide(nextSlide)
          scrollToSlide(nextSlide)
        } else {
          scrollToFooter()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (showFooterTransition) {
          const lastSlide = articles.length - 1
          setCurrentSlide(lastSlide)
          scrollToSlide(lastSlide)
          setShowFooterTransition(false)
        } else if (currentSlide > 0) {
          const prevSlide = currentSlide - 1
          setCurrentSlide(prevSlide)
          scrollToSlide(prevSlide)
        }
        break
      case 'Home':
        e.preventDefault()
        setCurrentSlide(0)
        scrollToSlide(0)
        setShowFooterTransition(false)
        break
      case 'End':
        e.preventDefault()
        scrollToFooter()
        break
    }
  }, [currentSlide, articles.length, isTransitioning, scrollToSlide, scrollToFooter, showFooterTransition])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isTransitioning || isNavigating) return // Skip if manually navigating

      const scrollTop = window.scrollY
      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate which slide should be active based on scroll position
      const relativeScroll = scrollTop - containerTop
      const slideHeight = windowHeight
      const activeSlide = Math.floor(relativeScroll / slideHeight + 0.5)

      // Check if we're past the last slide (transitioning to footer)
      if (activeSlide >= articles.length) {
        setShowFooterTransition(true)
        setCurrentSlide(articles.length - 1)
      } else {
        setShowFooterTransition(false)
        const clampedSlide = Math.max(0, Math.min(articles.length - 1, activeSlide))
        
        if (clampedSlide !== currentSlide && !isTransitioning) {
          setCurrentSlide(clampedSlide)
        }
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
  }, [articles.length, currentSlide, isTransitioning, isNavigating, handleWheel, handleKeyDown]) // Added isNavigating to dependencies

  // Touch/swipe support for mobile
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return
      
      touchEndY = e.changedTouches[0]?.clientY ?? 0
      const deltaY = touchStartY - touchEndY
      const threshold = 50

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          // Swipe up - next slide or footer
          if (currentSlide < articles.length - 1) {
            const nextSlide = currentSlide + 1
            setCurrentSlide(nextSlide)
            scrollToSlide(nextSlide)
          } else {
            scrollToFooter()
          }
        } else if (deltaY < 0) {
          // Swipe down - previous slide
          if (showFooterTransition) {
            const lastSlide = articles.length - 1
            setCurrentSlide(lastSlide)
            scrollToSlide(lastSlide)
            setShowFooterTransition(false)
          } else if (currentSlide > 0) {
            const prevSlide = currentSlide - 1
            setCurrentSlide(prevSlide)
            scrollToSlide(prevSlide)
          }
        }
      }
    }

    if (containerRef.current) {
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSlide, articles.length, isTransitioning, scrollToSlide, scrollToFooter, showFooterTransition])

  const handleDotClick = useCallback((targetIndex: number) => {
    if (isTransitioning) return
    
    setCurrentSlide(targetIndex)
    scrollToSlide(targetIndex)
    setShowFooterTransition(false)
  }, [isTransitioning, scrollToSlide])

  const handleFooterDotClick = useCallback(() => {
    if (isTransitioning) return
    
    scrollToFooter()
  }, [isTransitioning, scrollToFooter])

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
          style={{ 
            width: `${showFooterTransition ? 100 : ((currentSlide + 1) / articles.length) * 100}%` 
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className="fixed top-6 right-6 z-40 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
        {showFooterTransition ? 'Footer' : `${currentSlide + 1} / ${articles.length}`}
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
              isActive={index === currentSlide && !showFooterTransition}
              isScrolling={isScrolling}
              totalArticles={articles.length}
            />
          ))}

          {/* Footer Transition Overlay */}
          {showFooterTransition && (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/50 to-transparent z-30 transition-opacity duration-1000" />
          )}
        </div>

        {/* Navigation Dots - Vertical Layout */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-4">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 hover:scale-110 ${
                index === currentSlide && !showFooterTransition
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          
          {/* Footer Dot */}
          <div className="h-2" /> {/* Spacer */}
          <button
            onClick={handleFooterDotClick}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 hover:scale-110 ${
              showFooterTransition
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label="Go to footer"
          />
        </div>
      </div>
    </>
  )
}