import { Component } from '@angular/core';
import { ADDRESS, ADDRESS_HREF, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@utils/contact-const';
import { BrandLinkedinIcon } from '../../icons/brand-linkedin.icon';
import { EnvelopeIcon } from '../../icons/envelope.icon';
import { LocationPinIcon } from '../../icons/location-pin.icon';
import { SmartphoneIcon } from '../../icons/smartphone.icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [EnvelopeIcon, LocationPinIcon, SmartphoneIcon, BrandLinkedinIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly email = { text: EMAIL, href: EMAIL_HREF };
  readonly address = { text: ADDRESS, href: ADDRESS_HREF };
  readonly phone = { text: PHONE, href: PHONE_HREF };
  readonly linkedin = { text: 'Ardium', href: 'https://www.linkedin.com/company/ardiumpl' };
}
