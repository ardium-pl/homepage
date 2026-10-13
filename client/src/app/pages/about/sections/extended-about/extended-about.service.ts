import { httpResource, HttpResourceRequest } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LocaleService } from '../../../../services/locale.service';

export interface ExtendedAboutContent {
  title: string;
  paragraphs: string[];
  imageUrl: string | null;
}

interface RawExtendedAboutContent {
  title: string;
  content: string;
  imageUrl: string | null;
}

interface SanityQueryResponse<T> {
  result: T;
}

const EXTENDED_ABOUT_QUERY = `*[_type == "aboutUsPage"][0]{
  "content": coalesce(aboutUsContents[0], hero.aboutUsContents[0]){
    "title": coalesce(title[$language], title.en, ""),
    "content": coalesce(content[$language], content.en, ""),
    "imageUrl": image.asset->url
  }
}`;

@Injectable({ providedIn: 'root' })
export class ExtendedAboutService {
  private readonly locale = inject(LocaleService);
  private readonly sanityHost = environment.sanity.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io';

  private readonly request = computed<HttpResourceRequest>(() => ({
    url: `https://${environment.sanity.projectId}.${this.sanityHost}/v${environment.sanity.apiVersion}/data/query/${environment.sanity.dataset}`,
    method: 'GET',
    params: {
      query: EXTENDED_ABOUT_QUERY,
      $language: JSON.stringify(this.locale.language),
    },
  }));

  readonly contentResource = httpResource<ExtendedAboutContent | null>(() => this.request(), {
    defaultValue: null,
    parse: (raw) => this.parseResponse(raw),
  });

  readonly content = this.contentResource.value;
  readonly loading = this.contentResource.isLoading;
  readonly error = computed(() => !this.loading() && !!this.contentResource.error());

  private parseResponse(raw: unknown): ExtendedAboutContent | null {
    const response = raw as SanityQueryResponse<{ content?: RawExtendedAboutContent | null } | null>;
    const content = response?.result?.content;

    if (!content) {
      return null;
    }

    const paragraphs = content.content
      .split(/\n{2,}/)
      .map((part) => part.trim())
      .filter(Boolean);

    const hasContent = Boolean(content.title || paragraphs.length || content.imageUrl);
    return hasContent
      ? {
          title: content.title,
          paragraphs,
          imageUrl: content.imageUrl,
        }
      : null;
  }
}