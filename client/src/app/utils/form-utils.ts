import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const customValidators: {
  readonly email: ValidatorFn;
} = {
  email: (control: AbstractControl): ValidationErrors => {
    if (
      !/^[A-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\.[A-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[A-Z0-9-]+(?:\.[A-Z0-9-]{2,})*$/i.test(
        control.value
      )
    ) {
      return { email: true };
    }
    return {};
  },
};

const ERROR_MAP: Record<string, string> = {
  required: $localize`:@@form-errors.required:Please enter something here`,
  email: $localize`:@@form-errors.email:Please enter a valid email`,
};

export function translateError(control: AbstractControl<any>): string {
  const { touched, errors } = control;
  if (!touched || !errors) return '';

  const err = Object.keys(errors);

  return ERROR_MAP[err[0]] ?? '';
}
