import { PortableTextNode } from '@pages/blog-post/blog-post.model';

export type BlogPostType = 'caseStudy' | 'blog';

export interface BlogPost {
  id: string;
  type: BlogPostType;
  publishedAt: string;
  date: string;
  title: string;
  summary: string;
  contentPreview: PortableTextNode[];
  imageUrl: string;
  imageAlt: string;
  slug: string;
}
