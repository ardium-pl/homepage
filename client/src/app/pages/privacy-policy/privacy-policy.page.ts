import { Component } from '@angular/core';
import { PreHeadingComponent } from '@components/pre-heading';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [PreHeadingComponent],
  templateUrl: './privacy-policy.page.html',
  styleUrl: './privacy-policy.page.scss',
})
export class PrivacyPolicyPage {}
