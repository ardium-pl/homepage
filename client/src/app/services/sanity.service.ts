import { HttpResourceRequest } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { createClient, type QueryParams, type SanityClient } from '@sanity/client';
import { environment } from '../../environments/environment';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private readonly locale = inject(LocaleService);
  private readonly sanityHost = environment.sanity.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io';

  private readonly client: SanityClient = createClient({
    ...environment.sanity,
    perspective: 'published',
  });

  fetch<T>(query: string, params: QueryParams = {}): Promise<T> {
    return this.client.fetch<T>(query, params);
  }

  public newHttpRequest(query: string): Signal<HttpResourceRequest> {
    return computed<HttpResourceRequest>(() => ({
      url: `https://${environment.sanity.projectId}.${this.sanityHost}/v${environment.sanity.apiVersion}/data/query/${environment.sanity.dataset}`,
      method: 'GET',
      params: {
        query,
        $language: JSON.stringify(this.locale.language),
      },
    }));
  }
}
