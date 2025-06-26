import Link from 'next/link'
import { Article } from '@/types'
import AuthorByline from '@/components/AuthorByline'

interface ArticleGridProps {
  articles: Article[]
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:gap-12">
      {/* First article - large feature */}
      {articles[0] && (
        <article className="group">
          <Link href={`/articles/${articles[0].slug}`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              {articles[0].metadata?.featured_image && (
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={`${articles[0].metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={articles[0].metadata?.headline || articles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div>
                {/* Category */}
                {articles[0].metadata?.category && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-primary">
                      {articles[0].metadata.category.metadata?.name || articles[0].metadata.category.title}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-3xl font-serif mb-4 group-hover:text-primary transition-colors line-clamp-4 leading-tight">
                  {articles[0].metadata?.headline || articles[0].title}
                </h3>

                {/* Excerpt */}
                {articles[0].metadata?.excerpt && (
                  <p className="text-muted-foreground text-lg mb-4 line-clamp-3">
                    {articles[0].metadata.excerpt}
                  </p>
                )}

                {/* Author & Meta */}
                <AuthorByline 
                  author={articles[0].metadata?.author} 
                  publicationDate={articles[0].metadata?.publication_date}
                  readTime={articles[0].metadata?.read_time}
                />
              </div>
            </div>
          </Link>
        </article>
      )}

      {/* Remaining articles - grid layout */}
      {articles.slice(1).length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <article key={article.id} className="group">
              <Link href={`/articles/${article.slug}`}>
                {/* Image */}
                {article.metadata?.featured_image && (
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                    <img
                      src={`${article.metadata.featured_image.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
                      alt={article.metadata?.headline || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Category */}
                {article.metadata?.category && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-primary">
                      {article.metadata.category.metadata?.name || article.metadata.category.title}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-serif mb-3 group-hover:text-primary transition-colors line-clamp-4 leading-snug">
                  {article.metadata?.headline || article.title}
                </h3>

                {/* Excerpt */}
                {article.metadata?.excerpt && (
                  <p className="text-muted-foreground mb-3 line-clamp-3 text-sm">
                    {article.metadata.excerpt}
                  </p>
                )}

                {/* Author & Meta */}
                <AuthorByline 
                  author={article.metadata?.author} 
                  publicationDate={article.metadata?.publication_date}
                  readTime={article.metadata?.read_time}
                  compact
                />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}