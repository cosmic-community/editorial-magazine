// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Media file interface for Cosmic CMS file metafields
export interface MediaFile {
  url: string;
  imgix_url: string;
  name?: string;
  size?: number;
  type?: string;
}

// Site Settings
export interface SiteSettings extends CosmicObject {
  type_slug: 'site-settings';
  metadata: {
    site_name?: string;
    tagline?: string;
    logo?: MediaFile;
    favicon?: MediaFile;
    accent_color?: string;
    newsletter_enabled?: boolean;
    newsletter_heading?: string;
    newsletter_description?: string;
    footer_about?: string;
    contact_email?: string;
    phone?: string;
    address?: string;
    social_links?: {
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
}

// Author
export interface Author extends CosmicObject {
  type_slug: 'authors';
  metadata: {
    full_name?: string;
    bio?: string;
    profile_photo?: MediaFile;
    job_title?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Category
export interface Category extends CosmicObject {
  type_slug: 'categories';
  metadata: {
    name?: string;
    description?: string;
    featured_image?: MediaFile;
    display_order?: number;
  };
}

// Article
export interface Article extends CosmicObject {
  type_slug: 'articles';
  metadata: {
    headline?: string;
    subheading?: string;
    excerpt?: string;
    content?: string;
    featured_image?: MediaFile;
    featured?: boolean;
    category?: Category;
    author?: Author;
    publication_date?: string;
    read_time?: string;
    tags?: string;
  };
}

// Page
export interface Page extends CosmicObject {
  type_slug: 'pages';
  metadata: {
    page_title?: string;
    content?: string;
    featured_image?: MediaFile;
    show_in_nav?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isArticle(obj: CosmicObject): obj is Article {
  return obj.type_slug === 'articles';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type_slug === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type_slug === 'categories';
}

export function isPage(obj: CosmicObject): obj is Page {
  return obj.type_slug === 'pages';
}

export function isSiteSettings(obj: CosmicObject): obj is SiteSettings {
  return obj.type_slug === 'site-settings';
}