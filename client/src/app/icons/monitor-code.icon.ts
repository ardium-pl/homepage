import { Component } from '@angular/core';

@Component({
  selector: 'icon-monitor-code',
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
      d="M16,16.6H8c-2.4,0-4.3-1.9-4.3-4.3v-4C3.7,6,5.6,4.1,8,4.1h8c2.4,0,4.3,1.9,4.3,4.3v3.9 C20.3,14.6,18.4,16.6,16,16.6z"
    />
    <line class="st0" x1="7.5" y1="19.9" x2="16.5" y2="19.9" />
    <line class="st0" x1="10.2" y1="16.6" x2="9.6" y2="19.9" />
    <line class="st0" x1="13.6" y1="16.6" x2="14.2" y2="19.9" />
    <polyline class="st0" points="14.0039,8.05 16.2941,10.3 14.0039,12.55" />
    <polyline class="st0" points="9.9961,12.55 7.7059,10.3 9.9961,8.05" />
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
export class MonitorCodeIcon {}
