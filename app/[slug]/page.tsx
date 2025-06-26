// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPage, getPages } from '@/lib/cosmic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return {
      title: 'Page Not Found'
    }
  }

  return {
    title: `${page.metadata?.page_title || page.title} - Editorial`,
  }
}

export async function generateStaticParams() {
  const pages = await getPages()
  
  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export default async function PageComponent({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-24 bg-muted">
        {page.metadata?.featured_image && (
          <div className="absolute inset-0">
            <img
              src={`${page.metadata.featured_image.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
              alt={page.metadata?.page_title || page.title}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-4">
            {page.metadata?.page_title || page.title}
          </h1>
        </div>
      </section>

      {/* Page Content */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        {page.metadata?.content && (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
          />
        )}
      </section>
    </div>
  )
}