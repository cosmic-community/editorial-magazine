'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Article } from '@/types'
import AuthorByline from '@/components/AuthorByline'

interface BlogSlideProps {
  article: Article
  index: number
  currentSlide: number
  isActive: boolean
  isScrolling: boolean
  totalArticles: number
}

export default function BlogSlide({ 
  article, 
  index, 
  currentSlide, 
  isActive, 
  isScrolling,
  totalArticles
}: BlogSlideProps) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isActive, hasAnimated])

  const translateY = (index - currentSlide) * 100
  const opacity = isActive ? 1 : 0.3
  const scale = isActive ? 1 : 0.95

  return (
    <div
      className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out"
      style={{
        transform: `translateY(${translateY}vh) scale(${scale})`,
        opacity,
        zIndex: isActive ? 20 : 10,
      }}
    >
      {/* Background Image */}
      {article.metadata?.featured_image && (
        <div className="absolute inset-0">
          <img
            src={`${article.metadata.featured_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={article.metadata?.headline || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto w-full h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Text Content */}
            <div className="text-white space-y-6 max-w-2xl">
              {/* Headline */}
              <h1 
                className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif leading-tight line-clamp-4 py-3 transform transition-all duration-1000 delay-500 ${
                  hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ lineHeight: '1.2' }}
              >
                {article.metadata?.headline || article.title}
              </h1>

              {/* Subheading */}
              {article.metadata?.subheading && (
                <p 
                  className={`text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed py-2 transform transition-all duration-1000 delay-700 ${
                    hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {article.metadata.subheading}
                </p>
              )}

              {/* Excerpt */}
              {article.metadata?.excerpt && (
                <p 
                  className={`text-base md:text-lg text-gray-300 leading-relaxed max-w-xl py-2 transform transition-all duration-1000 delay-900 ${
                    hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {article.metadata.excerpt}
                </p>
              )}

              {/* Author & Meta */}
              <div 
                className={`transform transition-all duration-1000 delay-1100 ${
                  hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <AuthorByline 
                  author={article.metadata?.author} 
                  publicationDate={article.metadata?.publication_date}
                  readTime={article.metadata?.read_time}
                  textColor="white"
                />
              </div>

              {/* CTA Button */}
              <div 
                className={`transform transition-all duration-1000 delay-1300 ${
                  hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 group"
                >
                  Read Article
                  <svg 
                    className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Secondary Content/Image */}
            <div 
              className={`hidden lg:block transform transition-all duration-1000 delay-1500 ${
                hasAnimated ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              {/* Additional visual element or content preview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-white/80 text-sm uppercase tracking-wider">Featured Story</span>
                  </div>
                  
                  {/* Clickable Category */}
                  {article.metadata?.category && (
                    <Link
                      href={`/categories/${article.metadata.category.slug}`}
                      className="block p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">
                          {article.metadata.category.metadata?.name || article.metadata.category.title}
                        </span>
                        <svg 
                          className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="text-white/70 text-sm mt-1">View all articles in this category</p>
                    </Link>
                  )}
                  
                  {/* Clickable Tags */}
                  {article.metadata?.tags && (
                    <div className="space-y-2">
                      <span className="text-white/80 text-xs uppercase tracking-wider">Related Topics</span>
                      <div className="flex flex-wrap gap-2">
                        {article.metadata.tags.split(',').slice(0, 3).map((tag, tagIndex) => (
                          <Link
                            key={tagIndex}
                            href={`/categories?tag=${encodeURIComponent(tag.trim())}`}
                            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-full transition-colors hover:scale-105"
                          >
                            {tag.trim()}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {article.metadata?.read_time && (
                    <div className="flex items-center space-x-2 text-white/70">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{article.metadata.read_time}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {isActive && index < totalArticles - 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm opacity-80">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}