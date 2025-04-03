import { Component } from '@angular/core';

@Component({
  selector: 'icon-message-ellipsis',
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
        d="M18.6,17.8c-1.7,2.1-4.2,3.1-6.6,3.1c-0.9,0-4.7,0-6.9,0c-0.7,0-1.1-0.7-0.7-1.3c0.2-0.3,0.5-0.7,0.7-1
		c0.2-0.3,0.2-0.7,0-1c-0.3-0.6-0.8-1.4-0.9-1.7c-1.5-3.2-0.9-7.1,1.7-9.8c3.6-3.6,9.6-3.4,12.9,0.8C21.3,10.1,21.2,14.7,18.6,17.8z
		"
      />
    </g>
    <circle class="st0" cx="12" cy="12.2" r="0.4" />
    <circle class="st0" cx="16.6" cy="12.2" r="0.4" />
    <circle class="st0" cx="7.4" cy="12.2" r="0.4" />
  </svg> `,
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
export class ArdIconMessageEllipsis {}
