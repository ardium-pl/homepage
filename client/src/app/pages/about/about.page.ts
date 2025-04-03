import { Component } from '@angular/core';
import { ExtendedAboutComponent } from "./sections/extended-about/extended-about.component";
import { StaffSection } from './sections/staff/staff.section';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [StaffSection, ExtendedAboutComponent],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage {

}
