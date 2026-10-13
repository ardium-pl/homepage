import { Component, inject } from '@angular/core';
import { ExtendedAboutService } from './extended-about.service';

@Component({
  selector: 'app-extended-about-section',
  standalone: true,
  imports: [],
  templateUrl: './extended-about.component.html',
  styleUrl: './extended-about.component.scss',
})
export class ExtendedAboutComponent {
  private readonly extendedAboutService = inject(ExtendedAboutService);

  readonly content = this.extendedAboutService.content;
  readonly loading = this.extendedAboutService.loading;
  readonly error = this.extendedAboutService.error;
}
