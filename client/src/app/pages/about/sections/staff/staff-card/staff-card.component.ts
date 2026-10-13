import { Component, computed, input } from '@angular/core';
import { ArdIconAt } from '@ardium-ui/icons';
import { BrandLinkedinIcon } from '../../../../../icons/brand-linkedin.icon';

@Component({
  selector: 'app-staff-card',
  standalone: true,
  imports: [BrandLinkedinIcon, ArdIconAt],
  templateUrl: './staff-card.component.html',
  styleUrl: './staff-card.component.scss',
})
export class StaffCardComponent {
  readonly imgSrc = input.required<string>();
  readonly name = input.required<string>();
  readonly jobTitle = input.required<string>();
  readonly nationality = input.required<string>();
  readonly email = input.required<string>();
  readonly mailtoLink = computed<string | undefined>(() =>
    this.email() ? `mailto:${this.email()}` : undefined
  );
  readonly linkedInName = input<string | undefined>(undefined);
  readonly linkedInLink = computed<string | undefined>(() =>
    this.linkedInName() ? `https://www.linkedin.com/in/p${this.linkedInName()}/` : undefined
  );
  readonly description = input.required<string>();
}
