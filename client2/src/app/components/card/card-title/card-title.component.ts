import { Component } from '@angular/core';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [],
  template: '<h3><ng-content /></h3>',
  styleUrl: './card-title.component.scss'
})
export class CardTitleComponent {

}
