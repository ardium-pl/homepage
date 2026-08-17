import { inject, Injectable } from '@angular/core';
import { SanityService } from '../../../../services/sanity.service';
import { ClientLogo } from './client-logos.model';
import { CLIENT_LOGOS_QUERY } from './client-logos.query';

interface ClientLogosContent {
  list: ClientLogo[];
}

@Injectable({ providedIn: 'root' })
export class ClientLogosService {
  private readonly sanity = inject(SanityService);

  getClientLogos(): Promise<ClientLogo[] | null> {
    return this.sanity.fetch<ClientLogosContent | null>(CLIENT_LOGOS_QUERY).then((content) => {
      const logos = content?.list.filter((logo) => logo.name?.trim() && logo.logoUrl) ?? [];
      return logos.length ? logos : null;
    });
  }
}

