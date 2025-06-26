// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getAuthors, getArticlesByAuthor } from '@/lib/cosmic'
import ArticleGrid from '@/components/ArticleGrid'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found'
    }
  }

  return {
    title: `${author.metadata?.full_name || author.title} - Editorial`,
    description: author.metadata?.bio,
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const [author, articles] = await Promise.all([
    getAuthor(slug),
    getArticlesByAuthor(slug)
  ])

  if (!author) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Author Header */}
      <section className="py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Author Photo */}
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                alt={author.metadata?.full_name || author.title}
                className="w-32 h-32 rounded-full"
              />
            )}
            
            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-serif mb-2">
                {author.metadata?.full_name || author.title}
              </h1>
              
              {author.metadata?.job_title && (
                <p className="text-lg text-primary mb-4">
                  {author.metadata.job_title}
                </p>
              )}
              
              {author.metadata?.bio && (
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {author.metadata.bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                {author.metadata?.twitter && (
                  <a
                    href={`https://twitter.com/${author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                
                {author.metadata?.linkedin && (
                  <a
                    href={author.metadata.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                
                {author.metadata?.website && (
                  <a
                    href={author.metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Website"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author's Articles */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-serif mb-4">
            Articles by {author.metadata?.full_name || author.title}
          </h2>
          <div className="w-16 h-px bg-primary"></div>
        </div>

        {articles.length > 0 ? (
          <ArticleGrid articles={articles} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles published yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}