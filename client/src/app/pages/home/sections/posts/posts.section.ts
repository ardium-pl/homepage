import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';
import { SanityImageComponent } from "@components/sanity-image/sanity-image.component";
import { SanityImageSource } from '@sanity/image-url';
import { from } from 'rxjs';
import { SanityService } from 'src/app/services/sanity.service';

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  thumbnail: SanityImageSource;
}

@Component({
  selector: 'app-posts-section',
  standalone: true,
  imports: [CardModule, PreHeadingComponent, SanityImageComponent],
  templateUrl: './posts.section.html',
  styleUrl: './posts.section.scss',
})
export class PostsSection {
  private readonly sanity = inject(SanityService);

  readonly posts = toSignal<Post[]>(from(this.sanity.fetch<Post[]>(`*[_type == "post"]`)));
}
