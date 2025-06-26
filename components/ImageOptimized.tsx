import React, { useState } from 'react'
import { MediaFile } from '@/types'

interface ImageOptimizedProps {
  src: string | MediaFile
  alt: string
  width: number
  height: number
  className?: string
  fit?: 'crop' | 'max' | 'scale' | 'fill'
  quality?: number
  loading?: 'lazy' | 'eager'
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

export default function ImageOptimized({
  src,
  alt,
  width,
  height,
  className = '',
  fit = 'crop',
  quality = 80,
  loading = 'lazy',
  sizes,
  onLoad,
  onError
}: ImageOptimizedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const getOptimizedUrl = (source: string | MediaFile): string => {
    if (typeof source === 'string') {
      return source
    }
    
    if (!source.imgix_url) {
      return source.url
    }

    const params = new URLSearchParams({
      w: width.toString(),
      h: height.toString(),
      fit,
      auto: 'format,compress',
      q: quality.toString()
    })

    return `${source.imgix_url}?${params.toString()}`
  }

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Actual image */}
      <img
        src={getOptimizedUrl(src)}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }}
      />
    </div>
  )
}

// Responsive image component
export function ImageResponsive({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  ...props
}: Omit<ImageOptimizedProps, 'width' | 'height'> & {
  aspectRatio?: string
}) {
  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ aspectRatio }}
    >
      <ImageOptimized
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="absolute inset-0 w-full h-full"
        {...props}
      />
    </div>
  )
}