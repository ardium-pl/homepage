import type { BlogPostType } from '@pages/blog/blog.model';

export function blogPostTypeLabel(type: BlogPostType): string {
  return type === 'caseStudy'
    ? $localize`:@@blog.type.caseStudy:Case Study`
    : $localize`:@@blog.type.blog:Post`;
}
