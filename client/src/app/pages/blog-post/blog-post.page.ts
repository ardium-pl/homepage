import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { BlogPostDetails } from './blog-post.model';
import { BlogPostService } from './blog-post.service';
import { PortableContentComponent } from './components/portable-content/portable-content.component';
import { PostHeroComponent } from './components/post-hero/post-hero.component';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [RouterLink, PostHeroComponent, PortableContentComponent],
  templateUrl: './blog-post.page.html',
  styleUrl: './blog-post.page.scss',
})
export class BlogPostPage {
  private readonly route = inject(ActivatedRoute);
  private readonly blogPostService = inject(BlogPostService);
  private readonly destroyRef = inject(DestroyRef);
  private requestId = 0;

  readonly post = signal<BlogPostDetails | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly notFound = signal(false);

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('slug') ?? ''),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((slug) => void this.loadPost(slug));
  }

  private async loadPost(slug: string): Promise<void> {
    const requestId = ++this.requestId;
    this.post.set(null);
    this.loading.set(true);
    this.error.set(false);
    this.notFound.set(false);

    try {
      const post = await this.blogPostService.getPost(slug);
      if (requestId !== this.requestId) return;
      this.post.set(post);
      this.notFound.set(!post);
    } catch {
      if (requestId !== this.requestId) return;
      this.error.set(true);
    } finally {
      if (requestId === this.requestId) this.loading.set(false);
    }
  }
}
