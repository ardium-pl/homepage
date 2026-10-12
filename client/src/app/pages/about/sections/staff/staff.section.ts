import { Component } from '@angular/core';
import { StaffCardComponent } from '@pages/about/sections/staff/staff-card/staff-card.component';
import arrayShuffle from 'array-shuffle';
import { PreHeadingComponent } from '../../../../components/pre-heading/pre-heading.component';

export interface StaffData {
  imgSrc: string;
  name: string;
  jobTitle: string;
  nationality: string;
  email: string;
  linkedInLink?: string;
  description: string;
}

@Component({
  selector: 'app-staff-section',
  standalone: true,
  imports: [StaffCardComponent, PreHeadingComponent],
  templateUrl: './staff.section.html',
  styleUrl: './staff.section.scss',
})
export class StaffSection {
  readonly STAFF_DATA = arrayShuffle([
    {
      imgSrc: 'staff/img-pawel-bakalarz.jpg',
      name: 'Paweł Bakalarz',
      jobTitle: $localize`:@@job_titles.lead_technical_specialist:Główny specjalista techniczny`,
      nationality: 'PL',
      email: 'pawel.bakalarz@ardium.pl',
      linkedInLink: 'pawel-bakalarz',
      description: $localize`:@@staff_descriptions.pawel_bakalarz:Odpowiada za techniczne prowadzenie projektów, architekturę systemów oraz wdrażanie rozwiązań webowych i AI. Łączy programowanie z koordynacją zespołu i dba o to, by każde rozwiązanie było dopracowane, stabilne i gotowe do skalowania razem z biznesem klienta.`,
    },
    {
      imgSrc: 'staff/img-jakub-brodka.jpg',
      name: 'Jakub Bródka',
      jobTitle: $localize`:@@job_titles.team_lead_manager:Kierownik zespołu`,
      nationality: 'PL',
      email: 'jakub.brodka@ardium.pl',
      linkedInLink: 'jakub-bródka-0119a2272',
      description: $localize`:@@staff_descriptions.jakub_brodka:Zarządza projektami z perspektywy strategicznej i odpowiada za sprawne funkcjonowanie całej organizacji. Dobiera technologie, analizuje wyceny, buduje zespoły i prowadzi relacje z klientami w trakcie realizacji. Wewnątrz firmy rozwija procesy, struktury i automatyzacje, które pozwalają zespołowi skupić się na tym, co najważniejsze.`,
    },
    {
      imgSrc: 'staff/img-mikolaj-wolny.jpg',
      name: 'Mikołaj Wolny',
      jobTitle: $localize`:@@job_titles.chief_of_sales:Dyrektor ds. sprzedaży`,
      nationality: 'PL',
      email: 'mikolaj.wolny@ardium.pl',
      linkedInLink: 'mikołaj-wolny-498597203',
      description: $localize`:@@staff_descriptions.mikolaj_wolny:Pracuje bezpośrednio z klientami. Pomaga im nazwać realne potrzeby i przekłada je na spójne, inżynierskie specyfikacje. Dzieli się doświadczeniem z wielu branż i projektów, inspiruje do nowych funkcjonalności i czuwa nad tym, by od pierwszej rozmowy cały projekt zmierzał we właściwym kierunku.`,
    },
  ]);
}
