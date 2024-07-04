import { Component } from '@angular/core';
import { ContactInfoComponent } from '../contact-info/contact-info.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactInfoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
