import { DatePipe, DecimalPipe, DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ArdIconClock, ArdIconLocationPin } from '@ardium-ui/icons';
import { CareerPosition } from '@pages/career/career.service';
import { kebab } from 'case';
import { AgreementTypeLabelPipe } from './agreement-type.pipe';
import { WorkTypeLabelPipe } from './work-type.pipe';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [DecimalPipe, DatePipe, ArdIconLocationPin, ArdIconClock, AgreementTypeLabelPipe, WorkTypeLabelPipe],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  readonly job = input.required<CareerPosition>();
  readonly mailtoLink = input.required<string>();

  private readonly document = inject(DOCUMENT);

  readonly expanded = signal(false);

  toggle(): void {
    this.expanded.update(value => !value);
  }

  readonly jobId = computed(() => {
    return `${this.job()._key}-${kebab(this.job().positionName)}`;
  });

  constructor() {
    effect((onCleanup) => {
      const currentFragment = this.document.location?.hash.slice(1);

      let timeoutId: number | undefined;
      if (currentFragment === this.jobId()) {
        timeoutId = setTimeout(() => {
          this.expanded.set(true);
        }, 150);
      }
      onCleanup(() => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
    });
  }
}
