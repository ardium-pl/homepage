import { inject, Injectable } from '@angular/core';
import { LocaleService } from '../../../../services/locale.service';
import { SanityService } from '../../../../services/sanity.service';
import { HeroContent } from './hero.model';
import { HERO_QUERY } from './hero.query';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private readonly sanity = inject(SanityService);
  private readonly locale = inject(LocaleService);

  getHero(): Promise<HeroContent | null> {
    return this.sanity.fetch<HeroContent | null>(HERO_QUERY, { language: this.locale.language });
  }
}
