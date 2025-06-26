import { createBucketClient } from '@cosmicjs/sdk'
import { Article, Author, Category, Page, SiteSettings } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all articles with full author and category data
export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.publication_date')

    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch articles')
  }
}

// Fetch featured article
export async function getFeaturedArticle(): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'articles',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Article
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch featured article')
  }
}

// Fetch single article by slug
export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'articles',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Article
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch article')
  }
}

// Fetch articles by category
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    // First get the category to get its ID
    const categoryResponse = await cosmic.objects
      .findOne({
        type: 'categories',
        slug: categorySlug
      })

    if (!categoryResponse.object) {
      return []
    }

    const categoryId = categoryResponse.object.id

    // Then fetch articles by category ID
    const response = await cosmic.objects
      .find({ 
        type: 'articles',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.publication_date')

    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch articles by category')
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('metadata.display_order')

    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

// Fetch single author by slug
export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch author')
  }
}

// Fetch articles by author
export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  try {
    // First get the author to get their ID
    const authorResponse = await cosmic.objects
      .findOne({
        type: 'authors',
        slug: authorSlug
      })

    if (!authorResponse.object) {
      return []
    }

    const authorId = authorResponse.object.id

    // Then fetch articles by author ID
    const response = await cosmic.objects
      .find({ 
        type: 'articles',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.publication_date')

    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch articles by author')
  }
}

// Fetch pages
export async function getPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages' })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.objects as Page[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pages')
  }
}

// Fetch single page by slug
export async function getPage(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'pages',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as Page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch page')
  }
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'site-settings' })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as SiteSettings
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch site settings')
  }
}