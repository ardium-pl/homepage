import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ArdIconClock, ArdIconLocationPin } from '@ardium-ui/icons';
import { CareerPosition } from '@pages/career/career.service';
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
  ],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  readonly job = input.required<CareerPosition>();
  readonly mailtoLink = input.required<string>();

  readonly expanded = signal(false);

  toggle(): void {
    this.expanded.update(value => !value);
  }
}
