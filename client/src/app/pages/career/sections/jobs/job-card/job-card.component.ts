import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ArdIconClock, ArdIconLink_2, ArdIconLocationPin } from '@ardium-ui/icons';
import { CareerPosition } from '@pages/career/career.service';
import { kebab } from 'case';
import { AgreementTypeLabelPipe } from './agreement-type.pipe';
import { WorkTypeLabelPipe } from './work-type.pipe';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    ArdIconLocationPin,
    ArdIconClock,
    AgreementTypeLabelPipe,
    WorkTypeLabelPipe,
    ArdIconLink_2,
  ],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  readonly job = input.required<CareerPosition>();
  readonly mailtoLink = input.required<string>();

  readonly expanded = signal(false);
  readonly currentFragment = toSignal(this._route.fragment, { initialValue: null });

  toggle(): void {
    this.expanded.update(value => !value);
  }

  readonly jobId = computed(() => {
    return `${this.job()._key}-${kebab(this.job().positionName)}`;
  });

  setFragment(): void {
    void this._router.navigate([], {
      fragment: this.jobId(),
    });
  }

  constructor() {
    effect(onCleanup => {
      const fragment = this.currentFragment();

      let timeoutId: number | undefined;
      if (fragment === this.jobId()) {
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
