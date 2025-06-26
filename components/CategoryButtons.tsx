// components/CategoryButtons.tsx
import Link from 'next/link'
import { Category } from '@/types'

interface CategoryButtonsProps {
  categories: Category[]
  title?: string
  className?: string
}

export default function CategoryButtons({ categories, title = "Related Topics", className = "" }: CategoryButtonsProps) {
  if (!categories.length) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="inline-flex items-center px-3 py-1.5 bg-muted hover:bg-primary hover:text-primary-foreground text-sm font-medium rounded-full transition-colors"
          >
            {category.metadata?.name || category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}