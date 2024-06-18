import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContactComponent } from '../contact/contact.component';
import { TrustUsComponent } from '../trust-us/trust-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactComponent, TrustUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Ardium - Home');
  }
}
