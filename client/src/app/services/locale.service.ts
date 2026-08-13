import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { AppLanguage } from '../models/localization.model';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly localeId = inject(LOCALE_ID);

  readonly language: AppLanguage = this.resolveLanguage(this.localeId);

  private resolveLanguage(localeId: string): AppLanguage {
    return localeId.startsWith('pl') ? 'pl' : 'en';
  }
}
