import { inject, Injectable } from '@angular/core';
import { SanityService } from '../../../../services/sanity.service';
import { ClientLogo } from './client-logos.model';
import { CLIENT_LOGOS_QUERY } from './client-logos.query';

interface ClientLogosContent {
  list: Array<{
    key?: string | null;
    name?: string | null;
    logoUrl?: string | null;
  }>;
}

@Injectable({ providedIn: 'root' })
export class ClientLogosService {
  private readonly sanity = inject(SanityService);

  getClientLogos(): Promise<ClientLogo[] | null> {
    return this.sanity.fetch<ClientLogosContent | null>(CLIENT_LOGOS_QUERY).then((content) => {
      const logos =
        content?.list.flatMap((logo): ClientLogo[] => {
          const key = logo.key?.trim();
          const name = logo.name?.trim();
          const logoUrl = logo.logoUrl?.trim();

          return key && name && logoUrl ? [{ key, name, logoUrl }] : [];
        }) ?? [];
      return logos.length ? logos : null;
    });
  }
}
