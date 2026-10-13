import { Injectable } from '@angular/core';
import { createClient, type QueryParams, type SanityClient } from '@sanity/client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private readonly client: SanityClient = createClient({
    ...environment.sanity,
    perspective: 'published',
  });

  fetch<T>(query: string, params: QueryParams = {}): Promise<T> {
    return this.client.fetch<T>(query, params);
  }
}
