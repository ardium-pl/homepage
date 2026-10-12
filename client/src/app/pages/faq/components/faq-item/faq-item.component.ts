import { Component, input, signal } from '@angular/core';
import { ArdIconArrowRight } from '@ardium-ui/icons';
import { TakeChance } from 'take-chance';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [ArdIconArrowRight],
  templateUrl: './faq-item.component.html',
  styleUrl: './faq-item.component.scss',
  host: {
    '[class.open]': 'isOpen()',
  }
})
export class FaqItemComponent {
  readonly htmlId = TakeChance.id();

  readonly question = input.required<string>();

  readonly isOpen = signal<boolean>(false);

  toggle() {
    this.isOpen.update(v => !v);
  }
}
