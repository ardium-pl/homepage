import { Component } from '@angular/core';

@Component({
  selector: 'icon-envelope',
  standalone: true,
  template: `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style="enable-background:new 0 0 24 24;"
  >
    <path
      class="st0"
      d="M17.2,4.7L17.2,4.7c2,0.1,3.8,1.7,3.8,3.7v7c0,2.2-1.8,3.9-4,3.9H7c-2.2,0-4-1.8-4-4v-7c0-1.9,1.8-3.5,3.8-3.6 H17.2z"
    />
    <path class="st0" d="M17.3,9.8l-4.2,2.7c-0.7,0.4-1.5,0.4-2.1,0L6.7,9.8" />
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
export class EnvelopeIcon {}
