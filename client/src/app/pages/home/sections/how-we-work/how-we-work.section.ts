import { Component, inject } from '@angular/core';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';
import { HowWeWorkService } from './how-we-work.service';

@Component({
  selector: 'app-how-we-work-section',
  standalone: true,
  imports: [CardModule, PreHeadingComponent],
  templateUrl: './how-we-work.section.html',
  styleUrl: './how-we-work.section.scss',
})
export class HowWeWorkSection {
  private readonly howWeWorkService = inject(HowWeWorkService);

  readonly content = this.howWeWorkService.content;
  readonly loading = this.howWeWorkService.loading;
  readonly error = this.howWeWorkService.error;
}
