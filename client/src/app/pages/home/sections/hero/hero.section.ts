import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@components/button';
import { PreHeadingComponent } from '@components/pre-heading/pre-heading.component';
import { HeroContent } from './hero.model';
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

  readonly hero = signal<HeroContent | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

  constructor() {
    void this.heroService
      .getHero()
      .then((hero) => {
        this.hero.set(hero);
        this.error.set(!hero);
      })
      .catch(() => this.error.set(true))
      .finally(() => this.loading.set(false));
  }

  onContactUsClick() {
    this.router.navigateByUrl('#contact-section');

    const element = document.getElementById('contact-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
