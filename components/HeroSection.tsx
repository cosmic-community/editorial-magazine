import Link from 'next/link'
import { Article } from '@/types'
import AuthorByline from '@/components/AuthorByline'

interface HeroSectionProps {
  article: Article
}

export default function HeroSection({ article }: HeroSectionProps) {
  const featuredImage = article.metadata?.featured_image

  return (
    <section className="relative min-h-[70vh] flex items-end">
      {/* Background Image */}
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={article.metadata?.headline || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        <div className="text-white">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-serif mb-4 text-balance">
            {article.metadata?.headline || article.title}
          </h1>

          {/* Subheading */}
          {article.metadata?.subheading && (
            <p className="text-xl md:text-2xl text-gray-200 mb-6 text-balance">
              {article.metadata.subheading}
            </p>
          )}

          {/* Author & Read Time */}
          <div className="flex items-center space-x-4">
            <AuthorByline 
              author={article.metadata?.author} 
              publicationDate={article.metadata?.publication_date}
              readTime={article.metadata?.read_time}
              textColor="white"
            />
          </div>

          {/* Read Article CTA */}
          <div className="mt-8">
            <Link
              href={`/articles/${article.slug}`}
              className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Read Article
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}