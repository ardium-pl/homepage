import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly disabled = input<boolean, any>(false, {
    transform: v => coerceBooleanProperty(v),
  });

  readonly htmlId = input<string | null | undefined>(null);
}
