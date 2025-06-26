<!-- README_START -->
# Editorial Magazine

A visually stunning, editorial-style blog inspired by modern online magazines. Built with Next.js 15 and powered by Cosmic CMS, featuring large full-width imagery, elegant typography, and a sophisticated grid-based layout reminiscent of premium digital publications.

## Features

- **Magazine-Style Layout**: Hero sections, editorial grids, and full-width feature images
- **Elegant Typography**: Clean, readable fonts with proper hierarchy and spacing
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Category Navigation**: Browse articles by Culture, Design, Technology, and Interviews
- **Featured Articles**: Highlight important stories with dedicated hero placement
- **Author Profiles**: Rich author pages with bio, social links, and published works
- **Newsletter Signup**: Integrated subscription form with configurable messaging
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Fast Performance**: Server-side rendering with Next.js 15 App Router
- **CMS Integration**: Easy content management through Cosmic CMS

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=blog-production-25b13250-5226-11f0-aae9-09031bc70a69)

## Original Prompt

This application was built based on the following request:

> Build a visually stunning, editorial-style blog that looks and feels like an online magazine. I want it to be inspired by the layout and elegance of Curate Labs' Annual Digest (https://curatelabs.co/annualdigest_subdomain/2.html). The design should include large, full-width feature images, elegant typography, clean grid layouts, and a modern aesthetic.
>
> The homepage should feature a hero section with a highlighted story, followed by a grid of recent posts. Each blog post should have its own dedicated page with large imagery, clean reading flow, and subtle animations.
>
> Include navigation for categories (like Culture, Design, Tech, Interviews) and a sticky header with logo and links.
>
> Make sure the site is fully responsive and optimized for mobile. Add a simple blog alert signup and an "About" section at the bottom of the homepage.
>
> Keep the color palette neutral and minimalist, using black, white, and shades of gray with the option to customize accent colors later.
>
> Finally, make it easy for me to manage and post new articles through the Cosmic CMS backend.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Framer Motion** - Smooth animations
- **React** - UI component library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the cloned bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd editorial-magazine
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the site.

## Cosmic SDK Examples

### Fetching Articles
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all articles with author and category data
const articles = await cosmic.objects
  .find({ type: 'articles' })
  .depth(1)
  .sort('-metadata.publication_date')

// Get featured article
const featuredArticle = await cosmic.objects
  .findOne({ 
    type: 'articles',
    'metadata.featured': true 
  })
  .depth(1)
```

### Getting Categories
```typescript
// Get all categories sorted by display order
const categories = await cosmic.objects
  .find({ type: 'categories' })
  .sort('metadata.display_order')
```

### Site Configuration
```typescript
// Get site settings
const siteSettings = await cosmic.objects
  .findOne({ type: 'site-settings' })
```

## Cosmic CMS Integration

This application integrates seamlessly with your Cosmic CMS bucket structure:

### Content Types
- **Articles**: Main blog posts with headline, content, featured images, and metadata
- **Authors**: Writer profiles with bio, photo, and social links
- **Categories**: Editorial sections (Culture, Design, Technology, Interviews)
- **Pages**: Static pages like About
- **Site Settings**: Global configuration for site name, colors, and newsletter

### Content Management
1. **Creating Articles**: Add new posts through the Cosmic dashboard with rich text editing
2. **Author Management**: Create and edit author profiles with social media links
3. **Category Organization**: Organize content into editorial sections
4. **Featured Content**: Toggle articles to appear in hero sections
5. **Site Configuration**: Update global settings like site name, colors, and newsletter text

### Image Optimization
All images are automatically optimized using Cosmic's built-in imgix integration for fast loading and responsive display.

## Deployment Options

### Deploy on Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Deploy on Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify settings

### Environment Variables for Production
Make sure to set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->