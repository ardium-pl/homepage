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

  hoveredIndex = signal<number>(0);  // Domyślnie ustawione na 0, co oznacza brak najechania
  lastHoveredIndex = signal<number>(1);  // Domyślnie ustawione na pierwsze logo (1)

  description = computed(() => {
    const items = document.querySelectorAll('.trust-us-item .description');
    if (this.hoveredIndex() > 0) {
      return items[this.hoveredIndex() - 1]?.textContent || '';
    } else if (this.lastHoveredIndex() > 0) {
      return items[this.lastHoveredIndex() - 1]?.textContent || '';
    } else {
      return 'Najedź na logo, aby zobaczyć opis';
    }
  });

  setHoveredIndex(index: number): void {
    if (index > 0) {
      this.lastHoveredIndex.set(index);
    }
    this.hoveredIndex.set(index);
  }

  getIconClass(index: number): string {
    if (this.hoveredIndex() === index || (this.hoveredIndex() === 0 && this.lastHoveredIndex() === index) || (this.hoveredIndex() === 0 && this.lastHoveredIndex() === 1 && index === 1)) {
      return 'big-icon';
    }
    return '';
  }
}
