import { httpResource, HttpResourceRequest } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { LocaleService } from '../../services/locale.service'

export interface FaqItem {
  key: string
  question: string
  answer: string
}

export interface FaqContent {
  preHeading: string
  title: string
  subtitle: string
  list: FaqItem[]
}

interface SanityQueryResponse<T> {
  result: T
}

const FAQ_QUERY = `*[_type == "faq"][0]{
  "preHeading": coalesce(preHeading[$language], preHeading.en, ""),
  "title": coalesce(title[$language], title.en, ""),
  "subtitle": coalesce(subtitle[$language], subtitle.en, ""),
  "list": coalesce(list[] {
    "key": _key,
    "question": coalesce(question[$language], question.en, ""),
    "answer": coalesce(answer[$language], answer.en, "")
  }, [])
}`

@Injectable({providedIn: 'root'})
export class FaqService {
  private readonly locale = inject(LocaleService)
  private readonly sanityHost = environment.sanity.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io'

  private readonly request = computed<HttpResourceRequest>(() => ({
    url: `https://${environment.sanity.projectId}.${this.sanityHost}/v${environment.sanity.apiVersion}/data/query/${environment.sanity.dataset}`,
    method: 'GET',
    params: {
      query: FAQ_QUERY,
      $language: JSON.stringify(this.locale.language),
    },
  }))

  readonly contentResource = httpResource<FaqContent | null>(() => this.request(), {
    defaultValue: null,
    parse: (raw) => this.parseResponse(raw),
  })

  readonly content = this.contentResource.value
  readonly loading = this.contentResource.isLoading
  readonly error = computed(() => !this.loading() && !!this.contentResource.error())

  private parseResponse(raw: unknown): FaqContent | null {
    const response = raw as SanityQueryResponse<FaqContent | null>
    const content = response?.result

    if (!content) {
      return null
    }

    const list = (content.list ?? []).filter((item) => item.question || item.answer)
    const hasContent = Boolean(content.preHeading || content.title || content.subtitle || list.length)

    return hasContent ? { ...content, list } : null
  }
}
