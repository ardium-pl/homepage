import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRUSTED_US_COMPANIES } from './company-data';

@Component({
  selector: 'app-trust-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-us.component.html',
  styleUrls: ['./trusted-us.component.scss'],
})
export class TrustedUsComponent {
  readonly trustedUsCompanies = TRUSTED_US_COMPANIES;

  readonly activeIndex = signal<number>(0);

  readonly activeDescription = computed(() => this.trustedUsCompanies[this.activeIndex()].description);
}
