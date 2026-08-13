import { Component, inject } from '@angular/core';
import { createAsyncContent } from '@utils/async-content';
import { ContactInfoService } from '../../../../content/contact-info/contact-info.service';
import { OfficeCardComponent } from '../../../../components/office-card/office-card.component';

@Component({
  selector: 'app-offices-section',
  standalone: true,
  imports: [OfficeCardComponent],
  templateUrl: './offices.section.html',
  styleUrl: './offices.section.scss',
})
export class OfficesSection {
  private readonly contactInfoService = inject(ContactInfoService);

  private readonly contactInfoState = createAsyncContent(() => this.contactInfoService.getContactInfo());

  readonly contactInfo = this.contactInfoState.content;
  readonly loading = this.contactInfoState.loading;
  readonly error = this.contactInfoState.error;
  readonly city = $localize`:@@offices.city.warsaw:Warsaw`;
}
