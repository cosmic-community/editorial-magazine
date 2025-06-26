import { getArticles, getSiteSettings } from '@/lib/cosmic'
import ScrollingBlogLayout from '@/components/ScrollingBlogLayout'
import NewsletterSection from '@/components/NewsletterSection'
import AboutSection from '@/components/AboutSection'

export default async function HomePage() {
  const [articles, siteSettings] = await Promise.all([
    getArticles(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen">
      {/* Scrolling Blog Layout */}
      <ScrollingBlogLayout articles={articles} />

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