import Link from 'next/link'
import { Author } from '@/types'

interface AuthorBylineProps {
  author?: Author
  publicationDate?: string
  readTime?: string
  textColor?: 'white' | 'default'
  compact?: boolean
}

export default function AuthorByline({ 
  author, 
  publicationDate, 
  readTime, 
  textColor = 'default',
  compact = false 
}: AuthorBylineProps) {
  const textColorClass = textColor === 'white' ? 'text-white' : 'text-muted-foreground'
  const authorColorClass = textColor === 'white' ? 'text-white hover:text-gray-200' : 'text-foreground hover:text-primary'

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`flex items-center ${compact ? 'text-xs' : 'text-sm'}`}>
      {/* Author */}
      {author && (
        <>
          {author.metadata?.profile_photo && !compact && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
              alt={author.metadata?.full_name || author.title}
              className="w-8 h-8 rounded-full mr-3"
            />
          )}
          
          <Link 
            href={`/authors/${author.slug}`}
            className={`font-medium ${authorColorClass} transition-colors`}
          >
            {author.metadata?.full_name || author.title}
          </Link>
        </>
      )}

      {/* Separator & Date */}
      {publicationDate && (
        <>
          {author && <span className={`mx-2 ${textColorClass}`}>•</span>}
          <time className={textColorClass}>
            {formatDate(publicationDate)}
          </time>
        </>
      )}

      {/* Separator & Read Time */}
      {readTime && (
        <>
          <span className={`mx-2 ${textColorClass}`}>•</span>
          <span className={textColorClass}>{readTime}</span>
        </>
      )}
    </div>
  )
}