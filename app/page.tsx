import { getArticles, getSiteSettings } from '@/lib/cosmic'
import ScrollingBlogLayout from '@/components/ScrollingBlogLayout'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'

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

      {/* Footer */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
}