import { inject, Injectable } from '@angular/core';
import { LocaleService } from '../../services/locale.service';
import { SanityService } from '../../services/sanity.service';
import { ContactInfo } from './contact-info.model';
import { CONTACT_INFO_QUERY } from './contact-info.query';

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  private readonly sanity = inject(SanityService);
  private readonly locale = inject(LocaleService);
  private request?: Promise<ContactInfo | null>;

  getContactInfo(): Promise<ContactInfo | null> {
    this.request ??= this.sanity
      .fetch<ContactInfo | null>(CONTACT_INFO_QUERY, { language: this.locale.language })
      .then((contactInfo) => {
        if (!contactInfo) return null;

        const hasContent = Object.values(contactInfo).some((value) => value.length > 0);
        return hasContent ? contactInfo : null;
      });
    return this.request;
  }
}
