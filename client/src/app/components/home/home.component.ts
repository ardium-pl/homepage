import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutUsComponent } from '../../features/about-us/about-us.component';
import { ContactComponent } from '../../features/contact/contact.component';
import { TrustedUsComponent } from '../../features/trusted-us/trusted-us.component';

@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [ContactComponent, TrustedUsComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Ardium - Home');
  }
}
