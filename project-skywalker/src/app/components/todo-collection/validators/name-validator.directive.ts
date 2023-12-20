import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function nameValidtor(startsWithName: string): ValidatorFn {
  console.log(startsWithName);

  return (control: AbstractControl): ValidationErrors | null =>
    control.value?.startsWith(startsWithName) ? null : { invalidName: true };
}

@Directive({
  selector: '[psNameValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NameValidatorDirective,
      multi: true
    }
  ]
})
export class NameValidatorDirective implements Validator {
  @Input('psNameValidator') startsWith?: string;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.startsWith ? nameValidtor(this.startsWith)(control) : null;
  }
}
