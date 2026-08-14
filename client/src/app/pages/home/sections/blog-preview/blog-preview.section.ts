import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreHeadingComponent } from '@components/pre-heading';
import { BlogService } from '@pages/blog/blog.service';
import { BlogPostType } from '@pages/blog/blog.model';
import { PortableContentComponent } from '@pages/blog-post/components/portable-content/portable-content.component';
import { createAsyncContent } from '@utils/async-content';

@Component({
  selector: 'app-blog-preview-section',
  standalone: true,
  imports: [RouterLink, PreHeadingComponent, PortableContentComponent],
  templateUrl: './blog-preview.section.html',
  styleUrl: './blog-preview.section.scss',
})
export class BlogPreviewSection {
  private readonly blogService = inject(BlogService);
  private readonly postsState = createAsyncContent(() => this.blogService.getPosts());

  readonly posts = computed(() => this.postsState.content()?.slice(0, 3) ?? []);

  typeLabel(type: BlogPostType): string {
    return type === 'caseStudy'
      ? $localize`:@@blog.type.caseStudy:Case Study`
      : $localize`:@@blog.type.blog:Post`;
  }
}
