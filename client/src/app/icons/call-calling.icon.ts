import { Component } from '@angular/core';

@Component({
  selector: 'icon-call-calling',
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
      d="M8.1,15.9c0.9,0.9,2.5,2.3,3.4,2.9c1.4,0.9,2.2,1.3,3.4,1.5c1,0.2,1.7-0.1,2.4-0.8c1.9-1.9,1.4-2.5,0.7-3.3 l-1.5-1.5c-0.3-0.3-1.1-0.7-1.8-0.5s-1.1,0.5-1.7,0.4c-0.7-0.1-1.4-0.4-2.3-1.3c-0.9-0.9-1.3-1.6-1.3-2.3 c-0.1-0.6,0.2-1.1,0.4-1.7c0.3-0.7-0.1-1.4-0.5-1.8L7.8,6C7,5.3,6.4,4.9,4.5,6.7c-0.7,0.7-1,1.4-0.8,2.4c0.2,1.2,0.6,2,1.5,3.4 C5.8,13.5,7.2,15,8.1,15.9L8.1,15.9z"
    />
    <path class="st0" d="M12.5,3.7c1.9,0.4,3.7,1.2,5.2,2.7c1.5,1.5,2.3,3.3,2.6,5.2" />
    <path class="st0" d="M12.4,6.7c1.1,0.3,2.3,0.8,3.1,1.7c0.9,0.9,1.4,2,1.7,3.1" />
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
export class CallCallingIcon {}
