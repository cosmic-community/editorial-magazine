// app/categories/page.tsx
import { getCategories } from '@/lib/cosmic'
import Link from 'next/link'

export const metadata = {
  title: 'Categories - Editorial',
  description: 'Browse all article categories and topics.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-4">Categories</h1>
          <p className="text-xl text-muted-foreground">
            Explore articles by topic and category
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group p-6 border border-border rounded-lg hover:border-primary transition-colors"
              >
                {/* Category Image */}
                {category.metadata?.featured_image && (
                  <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                    <img
                      src={`${category.metadata.featured_image.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
                      alt={category.metadata?.name || category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Category Info */}
                <h2 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">
                  {category.metadata?.name || category.title}
                </h2>
                
                {category.metadata?.description && (
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {category.metadata.description}
                  </p>
                )}

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium mr-2">View Articles</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories found.</p>
          </div>
        )}
      </section>
    </div>
  )
}