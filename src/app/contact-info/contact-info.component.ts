import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent implements OnInit {
  address: string = '';
  phone: string = '';
  email: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.address = this.contactService.getAddress();
    this.phone = this.contactService.getPhone();
    this.email = this.contactService.getEmail();
  }
}
