import { Component } from '@angular/core';
import { ContactSection } from './sections/contact/contact.section';
import { HeroSection } from './sections/hero/hero.section';
import { OfficesSection } from './sections/offices/offices.section';
import { PostsSection } from "./sections/posts/posts.section";
import { ServicesSection } from './sections/services/services.section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSection, ServicesSection, ContactSection, OfficesSection, PostsSection],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
