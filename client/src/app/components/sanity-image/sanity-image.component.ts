import { Component, inject, input } from '@angular/core';
import { SanityImageSource } from '@sanity/image-url';
import { SanityService } from 'src/app/services/sanity.service';

@Component({
  selector: 'app-sanity-image',
  standalone: true,
  imports: [],
  templateUrl: './sanity-image.component.html',
  styleUrl: './sanity-image.component.scss'
})
export class SanityImageComponent {
  readonly sanity = inject(SanityService);

  readonly image = input.required<SanityImageSource>();
  readonly alt = input.required<string>();
  readonly width = input.required<number, string | number>({ transform: (value) => (typeof value === 'number' ? value : parseInt(value, 10)) });
}
