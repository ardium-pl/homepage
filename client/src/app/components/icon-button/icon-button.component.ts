import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  readonly disabled = input<boolean, any>(false, {
    transform: v => coerceBooleanProperty(v),
  });

  readonly htmlId = input<string | null | undefined>(null);

  readonly type = input<'button' | 'reset' | 'submit'>('button');
}
