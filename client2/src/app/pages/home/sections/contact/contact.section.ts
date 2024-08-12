import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldTextareaComponent } from '@components/form/form-field/form-field-textarea.component';
import { FormFieldComponent } from '@components/form/form-field/form-field.component';
import { customValidators, translateError } from '@utils/form-utils';
import { createMailto } from '@utils/mailto';
import { ButtonComponent } from '../../../../components/button/button.component';

interface FormControls {
  name: AbstractControl<string | null>;
  email: AbstractControl<string | null>;
  subject: AbstractControl<string | null>;
  message: AbstractControl<string | null>;
}
interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, FormFieldTextareaComponent, JsonPipe, ButtonComponent],
  templateUrl: './contact.section.html',
  styleUrl: './contact.section.scss',
})
export class ContactSection {
  readonly form = new FormGroup<FormControls>({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, customValidators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, subject, message } = this.form.value as FormValues;

    const mailtoLink = createMailto(email, { subject: `${name} - ${subject}`, body: message });

    window.location.href = mailtoLink;
  }

  readonly translateError = translateError;
}
