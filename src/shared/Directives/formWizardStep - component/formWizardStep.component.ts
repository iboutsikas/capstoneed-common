import { Component, Input, ContentChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'ced-form-wizard-step',
  templateUrl: 'formWizardStep.component.html',
  styleUrls: ['formWizardStep.component.scss']
})
export class FormWizardStepComponent {

  @Input('title') stepTitle: string;
  //@Input('form')
  @ContentChild('*')
  injectedForm: any;


  constructor() {

  }

  ngAfterContentInit() {
    console.log(this.injectedForm);
  }

  onNext() {
    if (this.injectedForm) {
      console.log(this.injectedForm.form.value);
    }
  }
}
