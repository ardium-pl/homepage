import { Component, computed, input } from '@angular/core';
import { CardModule } from '@components/card';
import { createMailto } from '@utils/mailto';
import { CallCallingIcon } from '../../icons/call-calling.icon';
import { EnvelopeIcon } from '../../icons/envelope.icon';

@Component({
  selector: 'app-office-card',
  standalone: true,
  imports: [CardModule, EnvelopeIcon, CallCallingIcon],
  templateUrl: './office-card.component.html',
  styleUrl: './office-card.component.scss',
})
export class OfficeCardComponent {
  readonly city = input.required<string>();
  readonly address = input.required<string>();
  readonly email = input.required<string>();
  readonly phone = input.required<string>();

  readonly emailHref = computed(() => createMailto(this.email()));
  readonly phoneHref = computed(() => `tel:${this.phone().replace(/\s/g, '')}`);
}
