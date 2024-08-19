import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RequiredAsteriskComponent } from '../required-asterisk.component';
import { FormFieldTextareaComponent } from './form-field-textarea.component';

export type FormFieldAutocomplete =
  | 'on'
  | 'off'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'street-address'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'name'
  | 'additional-name'
  | 'family-name'
  | 'given-name'
  | 'honoric-prefix'
  | 'honoric-suffix'
  | 'nickname'
  | 'organization-title'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'one-time-code'
  | 'organization'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'url'
  | 'email'
  | 'photo'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-extension'
  | 'impp';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [RequiredAsteriskComponent],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent extends FormFieldTextareaComponent implements ControlValueAccessor {
  readonly autocomplete = input<FormFieldAutocomplete | undefined | null>();
}
