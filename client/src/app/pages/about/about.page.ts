import { Component } from '@angular/core';
import { StaffSection } from './sections/staff/staff.section';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [StaffSection],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage {

}
