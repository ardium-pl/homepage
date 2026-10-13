import { Component } from '@angular/core';
import { BlogPreviewSection } from './sections/blog-preview/blog-preview.section';
import { ClientLogosSection } from './sections/client-logos/client-logos.section';
import { ContactSection } from './sections/contact/contact.section';
import { HeroSection } from './sections/hero/hero.section';
import { HowWeWorkSection } from './sections/how-we-work/how-we-work.section';
import { IndustriesSection } from './sections/industries/industries.section';
import { OfficesSection } from './sections/offices/offices.section';
import { ServicesSection } from './sections/services/services.section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSection,
    ClientLogosSection,
    ServicesSection,
    BlogPreviewSection,
    ContactSection,
    OfficesSection,
    IndustriesSection,
    HowWeWorkSection
],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
