import { Component, inject, signal } from '@angular/core';
import { ContactInfo } from '../../../../content/contact-info/contact-info.model';
import { ContactInfoService } from '../../../../content/contact-info/contact-info.service';
import { OfficeCardComponent } from '../../../../components/office-card/office-card.component';

@Component({
  selector: 'app-offices-section',
  standalone: true,
  imports: [OfficeCardComponent],
  templateUrl: './offices.section.html',
  styleUrl: './offices.section.scss',
})
export class OfficesSection {
  private readonly contactInfoService = inject(ContactInfoService);

  readonly contactInfo = signal<ContactInfo | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly city = $localize`:@@offices.city.warsaw:Warsaw`;

  constructor() {
    void this.contactInfoService
      .getContactInfo()
      .then((contactInfo) => {
        this.contactInfo.set(contactInfo);
        this.error.set(!contactInfo);
      })
      .catch(() => this.error.set(true))
      .finally(() => this.loading.set(false));
  }
}
