import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trust-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-us.component.html',
  styleUrls: ['./trust-us.component.scss']
})

export class TrustUsComponent {
  @ViewChild('descriptionContainer', { static: true }) descriptionContainer!: ElementRef;

  hoveredIndex: number = -1;
  lastHoveredIndex: number = -1;

  setHoveredIndex(index: number): void {
    if (index >= 0) {
      this.lastHoveredIndex = index;
    }
    this.hoveredIndex = index;
  }

  getDescription(): string {
    const items = document.querySelectorAll('.trust-us-item .description');
    if (this.hoveredIndex >= 0) {
      return items[this.hoveredIndex]?.textContent || '';
    } else if (this.lastHoveredIndex >= 0) {
      return items[this.lastHoveredIndex]?.textContent || '';
    } else {
      return 'Najedź na logo, aby zobaczyć opis';
    }
  }
}