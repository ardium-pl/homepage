import { Component, computed, inject } from '@angular/core';
import { PreHeadingComponent } from '@components/pre-heading';
import { CareerService } from '@pages/career/career.service';

@Component({
  selector: 'app-company-qualities-section',
  standalone: true,
  imports: [PreHeadingComponent],
  templateUrl: './company-qualities.component.html',
  styleUrl: './company-qualities.component.scss',
})
export class CompanyQualitiesComponent {
  private readonly careerService = inject(CareerService);

  readonly content = computed(() => this.careerService.content()!);
}
