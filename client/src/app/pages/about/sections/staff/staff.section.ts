import { Component, inject } from '@angular/core';
import { StaffCardComponent } from '@pages/about/sections/staff/staff-card/staff-card.component';
import { PreHeadingComponent } from '../../../../components/pre-heading/pre-heading.component';
import { StaffService } from './staff.service';

@Component({
  selector: 'app-staff-section',
  standalone: true,
  imports: [StaffCardComponent, PreHeadingComponent],
  templateUrl: './staff.section.html',
  styleUrl: './staff.section.scss',
})
export class StaffSection {
  private readonly staffService = inject(StaffService);

  readonly staffData = this.staffService.staffData;
}
