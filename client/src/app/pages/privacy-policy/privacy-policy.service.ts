import { inject, Injectable } from '@angular/core';
import { LocaleService } from '../../services/locale.service';
import { SanityService } from '../../services/sanity.service';
import { PrivacyPolicy } from './privacy-policy.model';
import { PRIVACY_POLICY_QUERY } from './privacy-policy.query';

@Injectable({ providedIn: 'root' })
export class PrivacyPolicyService {
  private readonly sanity = inject(SanityService);
  private readonly locale = inject(LocaleService);

  getPolicy(): Promise<PrivacyPolicy | null> {
    return this.sanity
      .fetch<PrivacyPolicy | null>(PRIVACY_POLICY_QUERY, {language: this.locale.language})
      .then((policy) => {
        if (!policy?.updatedAt || !policy.content?.length) return null;
        return {
          ...policy,
          updatedAt: new Intl.DateTimeFormat(this.locale.language, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(`${policy.updatedAt}T00:00:00`)),
        };
      });
  }
}
