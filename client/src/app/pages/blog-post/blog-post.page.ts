import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  readonly post = signal<BlogPostDetails | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly notFound = signal(false);

  constructor() {
    void this.loadPost();
  }

  private async loadPost(): Promise<void> {
    try {
      const slug = this.route.snapshot.paramMap.get('slug') ?? '';
      const post = await this.blogPostService.getPost(slug);
      this.post.set(post);
      this.notFound.set(!post);
    } catch {
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }
}
