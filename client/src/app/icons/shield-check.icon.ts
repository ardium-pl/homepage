import { Component } from '@angular/core';

@Component({
  selector: 'icon-shield-check',
  standalone: true,
  template: `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style="enable-background:new 0 0 24 24;"
  >
    <path class="st0" d="M12 3.25L19 6v5.1c0 4.45-2.85 8.05-7 9.65-4.15-1.6-7-5.2-7-9.65V6l7-2.75z" />
    <path class="st0" d="M8.75 11.8l2.1 2.1 4.4-4.4" />
  </svg>`,
  styles: `
    svg {
      height: 100%;
      width: 100%;
      aspect-ratio: 1;
    }
    .st0 {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class ShieldCheckIcon {}
