import { Injectable } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { createImageUrlBuilder, SanityImageSource } from '@sanity/image-url';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private readonly client: SanityClient = createClient({
    projectId: 'tdnmb8yr',
    dataset: 'production',
    apiVersion: '2026-08-10',
    useCdn: true,
  });

  private readonly imageBuilder = createImageUrlBuilder(this.client);

  fetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
    return this.client.fetch<T>(query, params);
  }

  image(source: SanityImageSource) {
    return this.imageBuilder.image(source);
  }
}
