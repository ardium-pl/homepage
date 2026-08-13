import { Component, inject } from '@angular/core';
import { ContactInfoService } from '../../content/contact-info/contact-info.service';
import { BrandLinkedinIcon } from '../../icons/brand-linkedin.icon';
import { EnvelopeIcon } from '../../icons/envelope.icon';
import { LocationPinIcon } from '../../icons/location-pin.icon';
import { SmartphoneIcon } from '../../icons/smartphone.icon';
import { createAsyncContent } from '../../utils/async-content';
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

  private readonly contactInfoState = createAsyncContent(() => this.contactInfoService.getContactInfo());

  readonly contactInfo = this.contactInfoState.content;
  readonly loading = this.contactInfoState.loading;
  readonly error = this.contactInfoState.error;

  readonly createMailto = createMailto;
  readonly createMapLink = createUniversalMapLink;

  createPhoneLink(phoneNumber: string): string {
    return `tel:${phoneNumber.replace(/[^+\d]/g, '')}`;
  }
}
