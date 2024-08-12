import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button';
import { ContactSection } from "./sections/contact/contact.section";
import { HeroSection } from './sections/hero/hero.section';
import { OfficesSection } from "./sections/offices/offices.section";
import { ServicesSection } from "./sections/services/services.section";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSection, ButtonComponent, ServicesSection, ContactSection, OfficesSection],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
