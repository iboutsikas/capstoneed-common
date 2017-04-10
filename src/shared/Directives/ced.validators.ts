import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CedValidators {
  static notSelectedValue(invalidValue: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;

      return value !== invalidValue ? null : {'invalidSelected': true}
    }
  }

  static hasOneValueOf(validValues: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;

      for(let v of validValues) {
        if(value === v)
          return null;
      }

      return { 'valueNotInRange': true };

    }
  }

  static notNullOrWhitespace(control: AbstractControl): {[key: string]: any} {
    const value = control.value;

    return ((value != null) && (value.trim().length != 0))? null : { 'notNullOrWhitespace': true }
  }
}
