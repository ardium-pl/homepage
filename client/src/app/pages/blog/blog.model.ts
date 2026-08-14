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
