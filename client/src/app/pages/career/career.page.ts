import { Component, computed, inject } from '@angular/core';
import { PageHeroComponent } from '@components/page-hero/page-hero.component';
import { CareerService } from './career.service';
import { CompanyQualitiesComponent } from './sections/company-qualities/company-qualities.component';
import { JobsSection } from './sections/jobs/jobs.section';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [PageHeroComponent, JobsSection, CompanyQualitiesComponent],
  templateUrl: './career.page.html',
  styleUrl: './career.page.scss',
})
export class CareerPage {
  private readonly careerService = inject(CareerService);

  readonly content = this.careerService.content;
  readonly loading = this.careerService.loading;
  readonly error = this.careerService.error;

  readonly titleParts = computed(() => {
    const title = this.content()?.hero.title ?? '';
    return title.split('%%');
  });
}
