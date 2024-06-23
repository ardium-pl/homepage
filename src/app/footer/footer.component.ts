import { Component } from '@angular/core';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  address: string = '';
  phone: string = '';
  email: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.address = this.contactService.getAddress();
    this.phone = this.contactService.getPhone();
    this.email = this.contactService.getEmail();
  }
}
