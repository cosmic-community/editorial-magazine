import { notFound } from 'next/navigation'
import { getArticle, getArticles } from '@/lib/cosmic'
import AuthorByline from '@/components/AuthorByline'
import Link from 'next/link'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article Not Found'
    }
  }

  return {
    title: article.metadata?.headline || article.title,
    description: article.metadata?.excerpt,
    openGraph: {
      title: article.metadata?.headline || article.title,
      description: article.metadata?.excerpt,
      images: article.metadata?.featured_image ? [
        {
          url: `${article.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: article.metadata?.headline || article.title
        }
      ] : undefined
    }
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      {article.metadata?.featured_image && (
        <div className="relative h-[60vh] mb-8">
          <img
            src={`${article.metadata.featured_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={article.metadata?.headline || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        {/* Category Badge */}
        {article.metadata?.category && (
          <div className="mb-6 pt-4">
            <Link
              href={`/categories/${article.metadata.category.slug}`}
              className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              {article.metadata.category.metadata?.name || article.metadata.category.title}
            </Link>
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-balance text-foreground leading-tight">
          {article.metadata?.headline || article.title}
        </h1>

        {/* Subheading */}
        {article.metadata?.subheading && (
          <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
            {article.metadata.subheading}
          </p>
        )}

        {/* Author & Meta */}
        <div className="flex items-center justify-between border-b border-border pb-8 mb-8">
          <AuthorByline 
            author={article.metadata?.author} 
            publicationDate={article.metadata?.publication_date}
            readTime={article.metadata?.read_time}
          />

          {/* Tags */}
          {article.metadata?.tags && (
            <div className="hidden md:flex flex-wrap gap-2">
              {article.metadata.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        {article.metadata?.content && (
          <div 
            className="article-content prose prose-lg max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: article.metadata.content }}
          />
        )}

        {/* Author Bio */}
        {article.metadata?.author && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-start space-x-4">
              {article.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${article.metadata.author.metadata.profile_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                  alt={article.metadata.author.metadata?.full_name || article.metadata.author.title}
                  className="w-16 h-16 rounded-full"
                />
              )}
              
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-2 text-foreground">
                  <Link 
                    href={`/authors/${article.metadata.author.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.metadata.author.metadata?.full_name || article.metadata.author.title}
                  </Link>
                </h3>
                
                {article.metadata.author.metadata?.job_title && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {article.metadata.author.metadata.job_title}
                  </p>
                )}
                
                {article.metadata.author.metadata?.bio && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.metadata.author.metadata.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}