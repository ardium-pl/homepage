import { inject, Injectable } from '@angular/core';
import { LocaleService } from '../../services/locale.service';
import { SanityService } from '../../services/sanity.service';
import { BlogPost, BlogPostPreview } from './blog.model';
import { BLOG_POSTS_QUERY, BLOG_PREVIEW_QUERY } from './blog.query';

type SanityBlogPost = Omit<BlogPost, 'date'>;

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly sanity = inject(SanityService);
  private readonly locale = inject(LocaleService);

  getPosts(): Promise<BlogPost[]> {
    return this.fetchPosts(BLOG_POSTS_QUERY);
  }

  getPreviewPosts(): Promise<BlogPostPreview[]> {
    return this.fetchPosts<BlogPostPreview>(BLOG_PREVIEW_QUERY);
  }

  private fetchPosts<T extends SanityBlogPost>(query: string): Promise<(T & BlogPost)[]> {
    return this.sanity.fetch<T[]>(query, { language: this.locale.language }).then((posts) =>
      posts
        .filter((post) => post.title && post.summary && post.imageUrl && post.slug)
        .map((post) => ({
          ...post,
          imageAlt: post.imageAlt || post.title,
          date: this.formatDate(post.publishedAt),
        })),
    );
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat(this.locale.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value));
  }
}
