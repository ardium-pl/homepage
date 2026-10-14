import { httpResource, HttpResourceRequest } from '@angular/common/http';
import { computed, effect, inject, Injectable } from '@angular/core';
import arrayShuffle from 'array-shuffle';
import { environment } from '../../../../../environments/environment';
import { LocaleService } from '../../../../services/locale.service';

export interface StaffData {
  imgSrc: string;
  name: string;
  jobTitle: string;
  nationality: string;
  email: string;
  linkedInLink?: string;
  description: string;
}

interface StaffSanityResponse {
  list: Array<{
    name: string;
    jobTitle: string;
    countryCode: string | null;
    email: string;
    linkedInLink?: string;
    description: string;
    imgSrc: string | null;
  }>;
}

interface SanityQueryResponse<T> {
  result: T;
}

const STAFF_QUERY = `*[_type == "employees"][0]{
  "list": coalesce(list[] {
    "name": name,
    "jobTitle": coalesce(position[$language], position.en, ""),
    "countryCode": coalesce(countryCode, ""),
    "email": email,
    "linkedInLink": coalesce(linkedIn, ""),
    "description": coalesce(description[$language], description.en, bio[$language], bio.en, ""),
    "imgSrc": coalesce(portrait.asset->url, "")
  }, [])
}`;

@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly locale = inject(LocaleService);
  private readonly sanityHost = environment.sanity.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io';

  private readonly request = computed<HttpResourceRequest>(() => ({
    url: `https://${environment.sanity.projectId}.${this.sanityHost}/v${environment.sanity.apiVersion}/data/query/${environment.sanity.dataset}`,
    method: 'GET',
    params: {
      query: STAFF_QUERY,
      $language: JSON.stringify(this.locale.language),
    },
  }));

  readonly staffResource = httpResource<StaffData[]>(() => this.request(), {
    defaultValue: [],
    parse: raw => this.parseResponse(raw),
  });

  readonly staffData = computed(() =>
    arrayShuffle(this.staffResource.value().filter(item => item.name || item.email || item.imgSrc || item.description))
  );

  njfdnfj = effect(() => {
    console.log('Staff data updated:', this.staffData());
  });

  private parseResponse(raw: unknown): StaffData[] {
    const response = raw as SanityQueryResponse<StaffSanityResponse | null>;
    const list = response?.result?.list ?? [];

    return list.map(item => ({
      imgSrc: item.imgSrc ?? '',
      name: item.name,
      jobTitle: item.jobTitle,
      nationality: (item.countryCode ?? 'PL').toUpperCase(),
      email: item.email,
      linkedInLink: item.linkedInLink,
      description: item.description,
    }));
  }
}
