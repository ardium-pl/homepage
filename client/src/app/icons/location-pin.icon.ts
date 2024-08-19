import { Component } from '@angular/core';

@Component({
  selector: 'icon-location-pin',
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
      d="M4.77466 10.5858C4.77466 15.7269 10.8432 20.64 11.9996 20.64C13.1559 20.64 19.2245 15.7269 19.2245 10.5858C19.2245 6.59463 15.9898 3.36 11.9996 3.36C8.00929 3.36 4.77466 6.59463 4.77466 10.5858Z"
    />
    <path
      class="st0"
      d="M14.4076 10.5268C14.4076 9.19664 13.3296 8.11874 11.9995 8.11874C10.6685 8.11874 9.59064 9.19664 9.59064 10.5268C9.59064 11.8569 10.6685 12.9357 11.9995 12.9357C13.3296 12.9357 14.4076 11.8569 14.4076 10.5268Z"
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
export class LocationPinIcon {}
