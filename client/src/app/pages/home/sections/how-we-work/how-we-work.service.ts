import { httpResource, HttpResourceRequest } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { environment } from '../../../../../environments/environment'
import { LocaleService } from '../../../../services/locale.service'

export interface WorkflowItem {
  key: string
  title: string
  description: string
}

export interface WorkflowContent {
  preHeading: string
  title: string
  subtitle: string
  list: WorkflowItem[]
}

interface SanityQueryResponse<T> {
  result: T
}

const WORKFLOW_QUERY = `*[_type == "workflow"][0]{
  "preHeading": coalesce(preHeading[$language], preHeading.en, ""),
  "title": coalesce(title[$language], title.en, ""),
  "subtitle": coalesce(subtitle[$language], subtitle.en, ""),
  "list": coalesce(list[] {
    "key": _key,
    "title": coalesce(title[$language], title.en, ""),
    "description": coalesce(description[$language], description.en, "")
  }, [])
}`

@Injectable({providedIn: 'root'})
export class HowWeWorkService {
  private readonly locale = inject(LocaleService)
  private readonly sanityHost = environment.sanity.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io'

  private readonly request = computed<HttpResourceRequest>(() => ({
    url: `https://${environment.sanity.projectId}.${this.sanityHost}/v${environment.sanity.apiVersion}/data/query/${environment.sanity.dataset}`,
    method: 'GET',
    params: {
      query: WORKFLOW_QUERY,
      $language: JSON.stringify(this.locale.language),
    },
  }))

  readonly contentResource = httpResource<WorkflowContent | null>(() => this.request(), {
    defaultValue: null,
    parse: (raw) => this.parseResponse(raw),
  })

  readonly content = this.contentResource.value
  readonly loading = this.contentResource.isLoading
  readonly error = computed(() => !this.loading() && !!this.contentResource.error())

  private parseResponse(raw: unknown): WorkflowContent | null {
    const response = raw as SanityQueryResponse<WorkflowContent | null>
    const content = response?.result

    if (!content) {
      return null
    }

    const list = (content.list ?? []).filter((item) => item.title || item.description)
    const hasContent = Boolean(content.preHeading || content.title || content.subtitle || list.length)

    return hasContent ? {...content, list} : null
  }
}