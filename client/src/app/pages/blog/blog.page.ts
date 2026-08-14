import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreHeadingComponent } from '@components/pre-heading/pre-heading.component';
import { createAsyncContent } from '@utils/async-content';
import { BlogPostType } from './blog.model';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PreHeadingComponent, RouterLink],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.scss',
})
export class BlogPage {
  private readonly blogService = inject(BlogService);
  private readonly postsState = createAsyncContent(() => this.blogService.getPosts());

  readonly posts = this.postsState.content;
  readonly loading = this.postsState.loading;
  readonly error = this.postsState.error;
  readonly activeType = signal<BlogPostType>('caseStudy');
  readonly visiblePosts = computed(() =>
    (this.posts() ?? []).filter((post) => post.type === this.activeType()),
  );
}
