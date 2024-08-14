import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly annotated = input<boolean, any>(false, { transform: v => coerceBooleanProperty(v) });

  readonly noIcon = input<boolean, any>(false, { transform: v => coerceBooleanProperty(v) });
}
