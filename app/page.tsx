import { getArticles, getFeaturedArticle, getSiteSettings } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import ArticleGrid from '@/components/ArticleGrid'
import NewsletterSection from '@/components/NewsletterSection'
import AboutSection from '@/components/AboutSection'

export default async function HomePage() {
  const [articles, featuredArticle, siteSettings] = await Promise.all([
    getArticles(),
    getFeaturedArticle(),
    getSiteSettings()
  ])

  // Filter out featured article from main grid
  const gridArticles = featuredArticle 
    ? articles.filter(article => article.id !== featuredArticle.id)
    : articles

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredArticle && (
        <HeroSection article={featuredArticle} />
      )}

      {/* Articles Grid */}
      {gridArticles.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-serif mb-4">Latest Stories</h2>
            <div className="w-16 h-px bg-primary"></div>
          </div>
          <ArticleGrid articles={gridArticles.slice(0, 6)} />
        </section>
      )}

      {/* Newsletter Section */}
      {siteSettings?.metadata?.newsletter_enabled && (
        <NewsletterSection siteSettings={siteSettings} />
      )}

      {/* About Section */}
      {siteSettings?.metadata?.footer_about && (
        <AboutSection siteSettings={siteSettings} />
      )}
    </div>
  )
}