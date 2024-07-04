import { Component } from '@angular/core';
import { AboutUsComponent } from '../about-us/about-us.component';
import { Title } from '@angular/platform-browser';
import { ContactComponent } from '../contact/contact.component';
import { TrustUsComponent } from '../trust-us/trust-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactComponent, TrustUsComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Ardium - Home');
  }
}
