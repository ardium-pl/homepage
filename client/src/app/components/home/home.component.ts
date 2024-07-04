import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutUsComponent } from '../../features/about-us/about-us.component';
import { ContactComponent } from '../../features/contact/contact.component';
import { TrustUsComponent } from '../../features/trust-us/trust-us.component';

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
