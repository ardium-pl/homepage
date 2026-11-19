import { httpResource } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { SanityService } from '../../services/sanity.service';

export interface CareerPosition {
  _key: string;
  positionName: string;
  team: string;
  workLocation: string;
  workType: string;
  agreementType: string;
  description: string;
  requiredKnowledge: string[];
  salaryFrom: number;
  salaryTo: number;
  isSalaryPerHour: boolean;
  aboutPosition: string;
  responsibilities: string[];
  createdAt: Date;
}

export interface CareerContent {
  hero: {
    preHeading: string;
    title: string;
    subtitle: string;
  };
  positionsSection: {
    preHeading: string;
    title: string;
    subtitle: string;
    noOpenPositionsText: string;
    mailtoLink: string;
    positions: CareerPosition[];
  };
  companySection: {
    preHeading: string;
    title: string;
    qualities: {
      _key: string;
      title: string;
      description: string;
    }[];
  };
}

interface SanityQueryResponse<T> {
  result: T;
}

const CAREER_QUERY = `
  *[_type == "careersPage"][0] {
    hero {
      "preHeading": coalesce(preHeading[$language], preHeading.en, ""),
      "title": coalesce(title[$language], title.en, ""),
      "subtitle": coalesce(subtitle[$language], subtitle.en, "")
    },

    positionsSection {
      "preHeading": coalesce(preHeading[$language], preHeading.en, ""),
      "title": coalesce(title[$language], title.en, ""),
      "subtitle": coalesce(subtitle[$language], subtitle.en, ""),
      "noOpenPositionsText": coalesce(noOpenPositionsText[$language], noOpenPositionsText.en, ""),
      "mailtoLink": coalesce(mailtoLink[$language], mailtoLink.en, ""),

      "positions": coalesce(positions[] {
        "_key": _key,
        "positionName": coalesce(positionName[$language], positionName.en, ""),
        "team": coalesce(team[$language], team.en, ""),
        "workLocation": coalesce(workLocation[$language], workLocation.en, ""),
        workType,
        agreementType,
        "description": coalesce(description[$language], description.en, ""),
        "requiredKnowledge": coalesce(requiredKnowledge[] {
          "value": coalesce(@[$language], @.en, "")
        }.value, []),
        salaryFrom,
        salaryTo,
        isSalaryPerHour,
        "aboutPosition": coalesce(aboutPosition[$language], aboutPosition.en, ""),
        "responsibilities": coalesce(responsibilities[] {
          "value": coalesce(@[$language], @.en, "")
        }.value, []),
        createdAt
      }, [])
    },

    companySection {
      "preHeading": coalesce(preHeading[$language], preHeading.en, ""),
      "title": coalesce(title[$language], title.en, ""),
      "qualities": coalesce(qualities[] {
        "_key": _key,
        "title": coalesce(title[$language], title.en, ""),
        "description": coalesce(description[$language], description.en, "")
      }, [])
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class CareerService {
  private readonly sanity = inject(SanityService);

  readonly request = this.sanity.newHttpRequest(CAREER_QUERY);
  readonly contentResource = httpResource<CareerContent | null>(() => this.request(), {
    defaultValue: null,
    parse: raw => this.parseResponse(raw),
  });

  readonly content = this.contentResource.value;
  readonly loading = this.contentResource.isLoading;
  readonly error = computed(() => !this.loading() && !!this.contentResource.error());

  private parseResponse(raw: unknown): CareerContent | null {
    const response = raw as SanityQueryResponse<CareerContent | null>;
    const content = response?.result;

    if (!content) {
      return null;
    }

    return {
      ...content,
      positionsSection: {
        ...content.positionsSection,
        positions: content.positionsSection.positions.map(position => ({
          ...position,
          createdAt: new Date(position.createdAt),
        })),
      },
    };
  }
}
