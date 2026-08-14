import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { createAsyncContent } from '@utils/async-content';
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
  private readonly postState = createAsyncContent(() =>
    this.blogPostService.getPost(this.route.snapshot.paramMap.get('slug') ?? ''),
  );

  readonly post = this.postState.content;
  readonly loading = this.postState.loading;
  readonly error = this.postState.error;
}
