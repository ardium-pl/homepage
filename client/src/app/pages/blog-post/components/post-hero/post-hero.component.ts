import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post-hero',
  standalone: true,
  templateUrl: './post-hero.component.html',
  styleUrl: './post-hero.component.scss',
})
export class PostHeroComponent {
  readonly imageUrl = input<string | null>(null);
  readonly imageAlt = input('');
}
