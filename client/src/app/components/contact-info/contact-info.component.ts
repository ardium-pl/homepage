import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  readonly withLinkedIn = input<boolean, any>(false, { transform: v => Boolean(v) }); //TODO change
}
