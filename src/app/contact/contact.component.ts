import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit{
  address: string = '';
  phone: string = '';
  email: string = '';

  constructor(private titleService: Title, private contactService: ContactService) {
    this.titleService.setTitle('Ardium - Contact');
  }

  ngOnInit(): void {
    this.address = this.contactService.getAddress();
    this.phone = this.contactService.getPhone();
    this.email = this.contactService.getEmail();
  }
}
