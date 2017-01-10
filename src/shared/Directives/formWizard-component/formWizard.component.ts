import { Component, QueryList, ContentChildren } from '@angular/core';
import { FormWizardStepComponent } from '../formWizardStep - component/formWizardStep.component';

@Component({
  selector: 'ced-form-wizard',
  templateUrl: 'formWizard.component.html',
  styleUrls: ['formWizard.component.scss']
})
export class FormWizardComponent {

  @ContentChildren(FormWizardStepComponent) steps: QueryList<FormWizardStepComponent>;
}
