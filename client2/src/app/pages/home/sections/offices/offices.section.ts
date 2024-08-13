import { Component } from '@angular/core';
import { ADDRESS, EMAIL, PHONE } from '@utils/contact-const';
import { OfficeCardComponent } from '../../../../components/office-card/office-card.component';

@Component({
  selector: 'app-offices-section',
  standalone: true,
  imports: [OfficeCardComponent],
  templateUrl: './offices.section.html',
  styleUrl: './offices.section.scss',
})
export class OfficesSection {
  readonly OFFICES = [
    {
      city: 'Warsaw',
      address: ADDRESS,
      email: EMAIL,
      phone: PHONE,
    },
  ];
}
