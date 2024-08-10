import { Component } from '@angular/core';
import { PreHeadingComponent } from '@components/pre-heading/pre-heading.component';
import { ButtonComponent } from "../../../../components/button/button.component";

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [PreHeadingComponent, ButtonComponent],
  templateUrl: './hero.section.html',
  styleUrl: './hero.section.scss'
})
export class HeroSection {

}
