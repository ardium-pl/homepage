import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  readonly withLinkedIn = input<boolean, any>(false, { transform: v => coerceBooleanProperty(v) });
}
