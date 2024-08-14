import { Component } from '@angular/core';

@Component({
  selector: 'icon-document-spreadsheet',
  standalone: true,
  template: ` <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style="enable-background:new 0 0 24 24;"
  >
    <path
      class="st0"
      d="M15.8,18.3H8.2c-0.6,0-1-0.4-1-1v-5c0-0.6,0.4-1,1-1h7.5c0.6,0,1,0.4,1,1v5C16.8,17.8,16.3,18.3,15.8,18.3z"
    />
    <line class="st0" x1="12" y1="18.3" x2="12" y2="11.3" />
    <line class="st0" x1="7.2" y1="14.8" x2="16.7" y2="14.8" />
    <path
      class="st0"
      d="M13.7853,3c0.5585,0,1.0927,0.2277,1.4789,0.6305l3.7917,3.9493 c0.3659,0.3814,0.5712,0.8903,0.5712,1.4196v8.1651c0.0145,2.055-1.6035,3.7518-3.6574,3.8355c0,0-7.8957,0-7.9259-0.001 c-2.0724-0.0457-3.7158-1.762-3.6701-3.8345V6.6574C4.4224,4.6181,6.094,2.9922,8.1343,3H13.7853z"
    />
    <path class="st0" d="M14.2684,3.0625v2.8926c-0.001,1.4118,1.1422,2.557,2.554,2.5609h2.7389" />
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
export class DocumentSpreadsheetIcon {}
