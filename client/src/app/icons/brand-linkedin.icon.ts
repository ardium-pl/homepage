import { Component } from '@angular/core';

@Component({
  selector: 'icon-brand-linkedin',
  standalone: true,
  template: `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style="enable-background:new 0 0 24 24;"
  >
    <circle class="st0" cx="5.125" cy="5.125" r="2.125" />
    <rect x="3" y="9.5" class="st0" width="4.25" height="11.5" />
    <path
      class="st0"
      d="M21,13.51V21h-4v-5.75c0-0.9665-0.7835-1.75-1.75-1.75h0c-0.9665,0-1.75,0.7835-1.75,1.75V21h-4V9.5h4v1.64 c0.75-1.06,1.99-1.75,3.38-1.75c0.33,0,0.64,0.04,0.94,0.11C19.64,9.93,21,11.56,21,13.51z"
    />
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
export class BrandLinkedinIcon {}
