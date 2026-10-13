import { Component, inject } from '@angular/core';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';
import { IndustriesService } from './industries.service';

@Component({
  selector: 'app-industries-section',
  standalone: true,
  imports: [CardModule, PreHeadingComponent],
  templateUrl: './industries.section.html',
  styleUrl: './industries.section.scss',
})
export class IndustriesSection {
  private readonly industriesService = inject(IndustriesService);

  readonly content = this.industriesService.content;
  readonly loading = this.industriesService.loading;
  readonly error = this.industriesService.error;
}
