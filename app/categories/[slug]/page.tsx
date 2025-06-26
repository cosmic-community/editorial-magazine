// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getCategories, getArticlesByCategory } from '@/lib/cosmic'
import ArticleGrid from '@/components/ArticleGrid'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found'
    }
  }

  return {
    title: `${category.metadata?.name || category.title} - Editorial`,
    description: category.metadata?.description,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, articles] = await Promise.all([
    getCategory(slug),
    getArticlesByCategory(slug)
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <section className="relative py-24 bg-muted">
        {category.metadata?.featured_image && (
          <div className="absolute inset-0">
            <img
              src={`${category.metadata.featured_image.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
              alt={category.metadata?.name || category.title}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-4">
            {category.metadata?.name || category.title}
          </h1>
          
          {category.metadata?.description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {articles.length > 0 ? (
          <ArticleGrid articles={articles} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}