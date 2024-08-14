import { Component } from '@angular/core';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [],
  template: '<ng-content />',
  styleUrl: './card-content.component.scss',
})
export class CardContentComponent {}
