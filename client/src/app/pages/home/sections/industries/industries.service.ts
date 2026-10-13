import { httpResource, HttpResourceRequest } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { environment } from '../../../../../environments/environment'
import { LocaleService } from '../../../../services/locale.service'

export interface IndustryItem {
  key: string
  title: string
  description: string
  iconUrl: string | null
}

export interface IndustriesContent {
  preHeading: string
  title: string
  subtitle: string
  list: IndustryItem[]
}

interface SanityQueryResponse<T> {
  result: T
}

const INDUSTRIES_QUERY = `*[_type == "industries"][0]{
  "preHeading": coalesce(preHeading[$language], preHeading.en, ""),
  "title": coalesce(title[$language], title.en, ""),
  "subtitle": coalesce(subtitle[$language], subtitle.en, ""),
  "list": coalesce(list[] {
    "key": _key,
    "title": coalesce(title[$language], title.en, ""),
    "description": coalesce(description[$language], description.en, ""),
    "iconUrl": icon.asset->url
  }, [])
}`

@Injectable({providedIn: 'root'})
export class IndustriesService {
  private readonly locale = inject(LocaleService)
  private readonly sanityHost = environment.sanity.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io'

  private readonly request = computed<HttpResourceRequest>(() => ({
    url: `https://${environment.sanity.projectId}.${this.sanityHost}/v${environment.sanity.apiVersion}/data/query/${environment.sanity.dataset}`,
    method: 'GET',
    params: {
      query: INDUSTRIES_QUERY,
      $language: JSON.stringify(this.locale.language),
    },
  }))

  readonly contentResource = httpResource<IndustriesContent | null>(() => this.request(), {
    defaultValue: null,
    parse: (raw) => this.parseResponse(raw),
  })

  readonly content = this.contentResource.value
  readonly loading = this.contentResource.isLoading
  readonly error = computed(() => !this.loading() && !!this.contentResource.error())

  private parseResponse(raw: unknown): IndustriesContent | null {
    const response = raw as SanityQueryResponse<IndustriesContent | null>
    const content = response?.result

    if (!content) {
      return null
    }

    const list = (content.list ?? []).filter(
      (item) => item.title || item.description || item.iconUrl
    )

    const hasContent = Boolean(content.preHeading || content.title || content.subtitle || list.length)
    return hasContent ? {...content, list} : null
  }
}