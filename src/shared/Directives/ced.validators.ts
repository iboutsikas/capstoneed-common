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

  static hasGreaterNumericValueThan(other: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherValue = Number.parseInt(other.value);
      const value = Number.parseInt(control.value);

      return value > otherValue ? null : { 'numericValueGreaterThan': true }
    }
  }

  static notNullOrWhitespace(control: AbstractControl): {[key: string]: any} {
    const value = control.value;

    return ((value != null) && (value.trim().length != 0))? null : { 'notNullOrWhitespace': true }
  }

  static dateIsNotBefore(previous: AbstractControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      if(!previous) return null;

      // if(!previous.valid) return { 'dateNotBeforeControl': true };

      let result = CedValidators.dateIsNotBeforeString(previous.value.formatted)(control);

      return (result === null)? null: { 'dateNotBeforeControl': true };
    }
  }

  static dateIsNotBeforeString(breakpointDate: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let breakpoint = <any>new Date(breakpointDate).setHours(0, 0, 0, 0);
      let value = <any>new Date(control.value.formatted).setHours(0, 0, 0, 0);


      return value >= breakpoint ? null: { 'dateNotBefore': true };
    }
  }

  static dateIsNotAfter(previous: AbstractControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      if(!previous) return null;

      // if(!previous.valid) return { 'dateNotAfterControl': true };

      let result = CedValidators.dateIsNotAfterString(previous.value.formatted)(control);

      return (result === null)? null: { 'dateNotAfterControl': true };
    }
  }

  static dateIsNotAfterString(breakpointDate: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let breakpoint = <any>new Date(breakpointDate).setHours(0, 0, 0, 0);
      let value = <any>new Date(control.value.formatted).setHours(0, 0, 0, 0);

      return value <= breakpoint ? null: { 'dateNotAfter': true };
    }
  }
}
