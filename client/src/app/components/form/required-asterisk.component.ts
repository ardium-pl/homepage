import { Component } from '@angular/core';

@Component({
  selector: 'app-required-asterisk',
  standalone: true,
  template: '*',
  styles: `
    :host {
      color: var(--clr-danger);
      position: relative;
      bottom: 0.2em;
    }
  `,
})
export class RequiredAsteriskComponent {}
