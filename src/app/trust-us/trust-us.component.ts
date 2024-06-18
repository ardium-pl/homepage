import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-us.component.html',
  styleUrl: './trust-us.component.scss',
})
export class TrustUsComponent {
  hoveredIndex: number = -1;
}
