import { inject, Injectable } from '@angular/core';
import { LocaleService } from '../../services/locale.service';
import { SanityService } from '../../services/sanity.service';
import { BlogPostDetails } from './blog-post.model';
import { BLOG_POST_QUERY } from './blog-post.query';

@Injectable({ providedIn: 'root' })
export class BlogPostService {
  private readonly sanity = inject(SanityService);
  private readonly locale = inject(LocaleService);

  getPost(slug: string): Promise<BlogPostDetails | null> {
    return this.sanity
      .fetch<BlogPostDetails | null>(BLOG_POST_QUERY, {
        slug,
        language: this.locale.language,
      })
      .then((post) => {
        if (!post?.title || !post.summary) return null;
        return { ...post, imageAlt: post.imageAlt || post.title };
      });
  }
}
