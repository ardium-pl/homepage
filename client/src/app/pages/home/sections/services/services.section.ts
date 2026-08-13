import { Component, inject, signal } from '@angular/core';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';
import { ServicesContent } from './services.model';
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

  readonly content = signal<ServicesContent | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

  constructor() {
    void this.servicesService
      .getServices()
      .then((content) => {
        this.content.set(content);
        this.error.set(!content);
      })
      .catch(() => this.error.set(true))
      .finally(() => this.loading.set(false));
  }
}
