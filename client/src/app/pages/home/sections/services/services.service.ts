import { inject, Injectable } from '@angular/core';
import { LocaleService } from '../../../../services/locale.service';
import { SanityService } from '../../../../services/sanity.service';
import { ServicesContent } from './services.model';
import { SERVICES_QUERY } from './services.query';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private readonly sanity = inject(SanityService);
  private readonly locale = inject(LocaleService);

  getServices(): Promise<ServicesContent | null> {
    return this.sanity.fetch<ServicesContent | null>(SERVICES_QUERY, { language: this.locale.language }).then((content) => {
      if (!content) return null;

      const list = content.list.filter((service) => service.title || service.description || service.iconUrl);
      const hasContent = Boolean(content.preHeading || content.title || content.subtitle || list.length);

      return hasContent ? { ...content, list } : null;
    });
  }
}
