import { Component } from '@angular/core';

@Component({
  selector: 'icon-smartphone',
  standalone: true,
  template: `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style="enable-background:new 0 0 24 24;"
  >
    <g>
      <path
        class="st0"
        d="M15.5,21h-7c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c1.7,0,3,1.3,3,3v12C18.5,19.7,17.2,21,15.5,21z"
      />
      <circle class="st0" cx="12" cy="17.5" r="0.2" />
    </g>
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
export class SmartphoneIcon {}
