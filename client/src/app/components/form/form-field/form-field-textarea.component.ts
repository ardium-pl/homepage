import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@ardium-ui/devkit';
import { RequiredAsteriskComponent } from '../required-asterisk.component';

@Component({
  selector: 'app-form-field-textarea',
  standalone: true,
  imports: [RequiredAsteriskComponent],
  templateUrl: './form-field-textarea.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldTextareaComponent),
      multi: true,
    },
  ],
})
export class FormFieldTextareaComponent implements ControlValueAccessor {
  private readonly _value = signal<string>('');
  private _onTouchedRegistered: () => void = () => {};
  private _onChangeRegistered: (value: string) => void = () => {};

  readonly label = input.required<string>();
  readonly inputId = input<string>('');
  readonly required = input<boolean, any>(false, { transform: v => coerceBooleanProperty(v) });

  readonly errorText = input<string | undefined | null>();

  readonly placeholder = input<string>('');

  get value(): string {
    return this._value();
  }
  set value(val: string) {
    this._value.set(val);
    this._onChangeRegistered(val);
  }

  writeValue(value: string): void {
    this._value.set(value);
  }
  registerOnChange(fn: (value: string) => void): void {
    this._onChangeRegistered = fn;
  }
  registerOnTouched(fn: () => void): void {
    this._onTouchedRegistered = fn;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
  }
  onBlur(): void {
    this._onTouchedRegistered();
  }
}
