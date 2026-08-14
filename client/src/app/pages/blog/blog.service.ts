import { inject, Injectable } from '@angular/core';
import { LocaleService } from '../../services/locale.service';
import { SanityService } from '../../services/sanity.service';
import { BlogPost } from './blog.model';
import { BLOG_POSTS_QUERY } from './blog.query';

type SanityBlogPost = Omit<BlogPost, 'date'>;

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly sanity = inject(SanityService);
  private readonly locale = inject(LocaleService);

  getPosts(): Promise<BlogPost[] | null> {
    return this.sanity
      .fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY, { language: this.locale.language })
      .then((posts) => {
        const validPosts = posts
          .filter((post) => post.title && post.summary && post.imageUrl)
          .map((post) => ({
            ...post,
            imageAlt: post.imageAlt || post.title,
            date: this.formatDate(post.publishedAt),
          }));

        return validPosts.length ? validPosts : null;
      });
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat(this.locale.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value));
  }
}
