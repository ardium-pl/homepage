import { Component, HostListener, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HamburgerMenuComponent } from "../hamburger-menu/hamburger-menu.component";
import { IconButtonComponent } from "../icon-button/icon-button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, HamburgerMenuComponent, IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly isOpen = signal<boolean>(false);

  readonly isScrolled = signal<boolean>(false);

  @HostListener('document:scroll')
  onBodyScroll() {
    this.isScrolled.set(document.documentElement.scrollTop !== 0);
  }

  scrollTo(fragment: string): void {
    this.isOpen.set(false);

    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
