import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreHeadingComponent } from '@components/pre-heading';
import { BlogService } from '@pages/blog/blog.service';
import { PortableContentComponent } from '@pages/blog-post/components/portable-content/portable-content.component';
import { createAsyncContent } from '@utils/async-content';
import { blogPostTypeLabel } from '@utils/blog-post';

@Component({
  selector: 'app-blog-preview-section',
  standalone: true,
  imports: [RouterLink, PreHeadingComponent, PortableContentComponent],
  templateUrl: './blog-preview.section.html',
  styleUrl: './blog-preview.section.scss',
})
export class BlogPreviewSection {
  private readonly blogService = inject(BlogService);
  private readonly postsState = createAsyncContent(() => this.blogService.getPreviewPosts());

  readonly posts = this.postsState.content;
  readonly typeLabel = blogPostTypeLabel;
}
