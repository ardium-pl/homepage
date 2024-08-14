import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@components/button';
import { PreHeadingComponent } from '@components/pre-heading/pre-heading.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [PreHeadingComponent, ButtonComponent],
  templateUrl: './hero.section.html',
  styleUrl: './hero.section.scss'
})
export class HeroSection {
  private readonly router = inject(Router);

  onContactUsClick() {
    this.router.navigateByUrl('#contact')
  }
}
