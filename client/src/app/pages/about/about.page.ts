import { Component } from '@angular/core';
import { ExtendedAboutComponent } from "./sections/extended-about/extended-about.component";
import { HowWeWorkSection } from './sections/how-we-work/how-we-work.section';
import { IndustriesSection } from './sections/industries/industries.section';
import { StaffSection } from './sections/staff/staff.section';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [StaffSection, ExtendedAboutComponent, IndustriesSection, HowWeWorkSection],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage {

}
