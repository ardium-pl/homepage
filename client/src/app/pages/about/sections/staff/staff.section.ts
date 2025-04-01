import { Component, signal } from '@angular/core';
import { StaffCardComponent } from '@components/staff-card/staff-card.component';
import arrayShuffle from 'array-shuffle';
import { PreHeadingComponent } from "../../../../components/pre-heading/pre-heading.component";

export interface StaffData {
  imgSrc: string;
  name: string;
  jobTitle: string;
  nationality: string;
  linkedInLink?: string;
}

@Component({
  selector: 'app-staff-section',
  standalone: true,
  imports: [StaffCardComponent, PreHeadingComponent],
  templateUrl: './staff.section.html',
  styleUrl: './staff.section.scss',
})
export class StaffSection {
  readonly staffData = signal<StaffData[]>(
    arrayShuffle([
      {
        imgSrc: 'staff/img-pawel-bakalarz.jpg',
        name: 'Paweł Bakalarz',
        jobTitle: $localize`:@@job_titles.lead_technical_specialist:Lead Technical Specialist`,
        nationality: 'PL',
        linkedInLink: 'pawel-bakalarz',
      },
      {
        imgSrc: 'staff/img-jakub-brodka.jpg',
        name: 'Jakub Bródka',
        jobTitle: $localize`:@@job_titles.team_lead_manager:Team Lead Manager`,
        nationality: 'PL',
        linkedInLink: 'jakub-bródka-0119a2272',
      },
      {
        imgSrc: 'staff/img-mikolaj-wolny.jpg',
        name: 'Mikołaj Wolny',
        jobTitle: $localize`:@@job_titles.chief_of_sales:Chief of Sales`,
        nationality: 'PL',
        linkedInLink: 'mikołaj-wolny-498597203',
      },
    ])
  );
}
