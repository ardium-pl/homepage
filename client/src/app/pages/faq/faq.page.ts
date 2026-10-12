import { Component } from '@angular/core';
import { PageHeroComponent } from '@components/page-hero/page-hero.component';
import { FaqItemComponent } from './components/faq-item/faq-item.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [PageHeroComponent, FaqItemComponent],
  templateUrl: './faq.page.html',
  styleUrl: './faq.page.scss',
})
export class FaqPage {}
