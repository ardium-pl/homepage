import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@components/button';
import { PreHeadingComponent } from '@components/pre-heading/pre-heading.component';
import { createAsyncContent } from '@utils/async-content';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [PreHeadingComponent, ButtonComponent],
  templateUrl: './hero.section.html',
  styleUrl: './hero.section.scss',
})
export class HeroSection {
  private readonly router = inject(Router);
  private readonly heroService = inject(HeroService);

  private readonly heroState = createAsyncContent(() => this.heroService.getHero());

  readonly hero = this.heroState.content;
  readonly loading = this.heroState.loading;
  readonly error = this.heroState.error;

  onContactUsClick() {
    void this.router.navigate([], { fragment: 'contact-section' });
  }
}
