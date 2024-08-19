import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss',
  host: {
    '[class.open]': 'open()',
  },
})
export class HamburgerMenuComponent {
  readonly open = input.required<boolean>();
}
