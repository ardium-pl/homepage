import { Pipe, PipeTransform } from '@angular/core';

const AGREEMENT_TYPE_LABELS: Record<string, string> = {
  'umowa-zlecenie': $localize`:@@career.agreement-type.mandate:Umowa zlecenie`,
  'umowa-o-dzielo': $localize`:@@career.agreement-type.specific-work:Umowa o dzieło`,
  'umowa-o-prace': $localize`:@@career.agreement-type.employment:Umowa o pracę`,
  'pelny-etat': $localize`:@@career.agreement-type.full-time:Pełny etat`,
  'czesc-etatu': $localize`:@@career.agreement-type.part-time:Część etatu`,
  b2b: $localize`:@@career.agreement-type.b2b:B2B`,
  staz: $localize`:@@career.agreement-type.internship:Staż`,
  praktyka: $localize`:@@career.agreement-type.placement:Praktyka`,
};

@Pipe({
  name: 'agreementTypeLabel',
  standalone: true,
})
export class AgreementTypeLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    return AGREEMENT_TYPE_LABELS[value] ?? value;
  }
}
