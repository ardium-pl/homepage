import { Component, ElementRef, ViewChild, signal, computed } from '@angular/core';
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

  hoveredIndex = signal<number>(0);  // Domyślnie ustawione na pierwsze logo
  lastHoveredIndex = signal<number>(0);  // Domyślnie ustawione na pierwsze logo

  description = computed(() => {
    const items = document.querySelectorAll('.trust-us-item .description');
    if (this.hoveredIndex() >= 0) {
      return items[this.hoveredIndex()]?.textContent || '';
    } else if (this.lastHoveredIndex() >= 0) {
      return items[this.lastHoveredIndex()]?.textContent || '';
    } else {
      return 'Najedź na logo, aby zobaczyć opis';
    }
  });

  setHoveredIndex(index: number): void {
    if (index >= 0) {
      this.lastHoveredIndex.set(index);
    }
    this.hoveredIndex.set(index);
  }

  getIconClass(index: number): string {
    if (this.hoveredIndex() === index || (this.hoveredIndex() === -1 && this.lastHoveredIndex() === index)) {
      return 'big-icon';
    }
    return '';
  }
}
