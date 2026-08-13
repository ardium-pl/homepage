import { Component, inject, signal } from '@angular/core';
import { ContactInfo } from '../../content/contact-info/contact-info.model';
import { ContactInfoService } from '../../content/contact-info/contact-info.service';
import { BrandLinkedinIcon } from '../../icons/brand-linkedin.icon';
import { EnvelopeIcon } from '../../icons/envelope.icon';
import { LocationPinIcon } from '../../icons/location-pin.icon';
import { SmartphoneIcon } from '../../icons/smartphone.icon';
import { createMailto } from '../../utils/mailto';
import { createUniversalMapLink } from '../../utils/maps-link';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [EnvelopeIcon, LocationPinIcon, SmartphoneIcon, BrandLinkedinIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly contactInfoService = inject(ContactInfoService);

  readonly contactInfo = signal<ContactInfo | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

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

  readonly createMailto = createMailto;
  readonly createMapLink = createUniversalMapLink;

  createPhoneLink(phoneNumber: string): string {
    return `tel:${phoneNumber.replace(/[^+\d]/g, '')}`;
  }
}
