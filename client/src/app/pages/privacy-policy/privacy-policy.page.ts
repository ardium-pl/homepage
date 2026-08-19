import { Component, inject } from '@angular/core';
import { PreHeadingComponent } from '@components/pre-heading';
import { createAsyncContent } from '../../utils/async-content';
import { PortableContentComponent } from '../blog-post/components/portable-content/portable-content.component';
import { PrivacyPolicyService } from './privacy-policy.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [PreHeadingComponent, PortableContentComponent],
  templateUrl: './privacy-policy.page.html',
  styleUrl: './privacy-policy.page.scss',
})
export class PrivacyPolicyPage {
  private readonly privacyPolicyService = inject(PrivacyPolicyService);
  private readonly policyState = createAsyncContent(() => this.privacyPolicyService.getPolicy());

  readonly policy = this.policyState.content;
  readonly loading = this.policyState.loading;
  readonly error = this.policyState.error;
}
