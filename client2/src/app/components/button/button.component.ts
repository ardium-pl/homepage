import { Component, computed, input } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';

export const ButtonAppearancce = {
  Outlined: 'outlined',
  Filled: 'filled',
} as const;
export type ButtonAppearance = (typeof ButtonAppearancce)[keyof typeof ButtonAppearancce];

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

  readonly type = input<'button' | 'reset' | 'submit'>('button');

  readonly appearance = input<ButtonAppearance>(ButtonAppearancce.Outlined);
  readonly ngClasses = computed(() =>
    [`appearance-${this.appearance()}`, this.disabled() ? 'no-pointer' : ''].join(' ')
  );
}
