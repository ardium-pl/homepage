import { Component, inject } from '@angular/core';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';
import { createAsyncContent } from '@utils/async-content';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardModule, PreHeadingComponent],
  templateUrl: './services.section.html',
  styleUrl: './services.section.scss',
})
export class ServicesSection {
  private readonly servicesService = inject(ServicesService);

  private readonly contentState = createAsyncContent(() => this.servicesService.getServices());

  readonly content = this.contentState.content;
  readonly loading = this.contentState.loading;
  readonly error = this.contentState.error;
}
