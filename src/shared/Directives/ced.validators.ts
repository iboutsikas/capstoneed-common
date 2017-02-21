import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CedValidators {
  static notSelectedValue(invalidValue: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;

      return value !== invalidValue ? null: {'invalidSelected': true}
    }
  }
}
