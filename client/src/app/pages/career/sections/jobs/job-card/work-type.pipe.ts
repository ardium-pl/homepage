import { Pipe, PipeTransform } from '@angular/core';

const WORK_TYPE_LABELS: Record<string, string> = {
  zdalnie: $localize`:@@career.work-type.remote:Zdalnie`,
  hybrydowo: $localize`:@@career.work-type.hybrid:Hybrydowo`,
  stacjonarnie: $localize`:@@career.work-type.onsite:Stacjonarnie`,
};

@Pipe({
  name: 'workTypeLabel',
  standalone: true,
})
export class WorkTypeLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    return WORK_TYPE_LABELS[value] ?? value;
  }
}
