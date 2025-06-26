import { getArticles, getSiteSettings } from '@/lib/cosmic'
import ScrollingBlogLayout from '@/components/ScrollingBlogLayout'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const [articles, siteSettings] = await Promise.all([
    getArticles(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen">
      {/* Scrolling Blog Layout with 90% scaling */}
      <div className="homepage-scale">
        <ScrollingBlogLayout articles={articles} />
      </div>

      {/* Footer - Now accessible after scrolling through articles */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
}