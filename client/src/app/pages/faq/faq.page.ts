import { Component, inject } from '@angular/core';
import { PageHeroComponent } from '@components/page-hero/page-hero.component';
import { FaqItemComponent } from './components/faq-item/faq-item.component';
import { FaqService } from './faq.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [PageHeroComponent, FaqItemComponent],
  templateUrl: './faq.page.html',
  styleUrl: './faq.page.scss',
})
export class FaqPage {
  private readonly faqService = inject(FaqService);

  readonly content = this.faqService.content;
  readonly loading = this.faqService.loading;
  readonly error = this.faqService.error;
}
