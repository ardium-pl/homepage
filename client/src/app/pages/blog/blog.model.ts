export type BlogPostType = 'caseStudy' | 'blog';

export interface BlogPost {
  id: string;
  type: BlogPostType;
  publishedAt: string;
  date: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
}

export interface BlogPostPreview extends BlogPost {
  contentPreview: PortableTextNode[];
}
import { PortableTextNode } from '@pages/blog-post/blog-post.model';
