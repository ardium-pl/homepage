import { Component } from '@angular/core';
import { OfficeCardComponent } from "../../../../components/office-card/office-card.component";

@Component({
  selector: 'app-offices-section',
  standalone: true,
  imports: [OfficeCardComponent],
  templateUrl: './offices.section.html',
  styleUrl: './offices.section.scss'
})
export class OfficesSection {

}
