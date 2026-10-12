import { Component, input } from '@angular/core';
import { PreHeadingComponent } from '@components/pre-heading/pre-heading.component';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [PreHeadingComponent],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.scss',
})
export class PageHeroComponent {
  readonly preheading = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
