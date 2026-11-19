import { Component, computed, inject } from '@angular/core';
import { PreHeadingComponent } from '@components/pre-heading';
import { CareerService } from '../../career.service';
import { JobCardComponent } from './job-card/job-card.component';

@Component({
  selector: 'app-jobs-section',
  standalone: true,
  imports: [PreHeadingComponent, JobCardComponent],
  templateUrl: './jobs.section.html',
  styleUrl: './jobs.section.scss',
})
export class JobsSection {
  private readonly careerService = inject(CareerService);

  readonly content = computed(() => this.careerService.content()!);
}
