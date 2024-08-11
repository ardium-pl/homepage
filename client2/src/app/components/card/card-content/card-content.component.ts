import { Component } from '@angular/core';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [],
  template: '<p><ng-content /></p>',
  styleUrl: './card-content.component.scss',
})
export class CardContentComponent {}
