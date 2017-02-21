import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxContext } from './rxContext';
import { FormWizardComponent } from './formWizard-component/formWizard.component';
import { FormWizardStepComponent } from './formWizardStep - component/formWizardStep.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RxContext,
    FormWizardComponent,
    FormWizardStepComponent,
  ],
  exports: [
    RxContext,
    FormWizardComponent,
    FormWizardStepComponent
  ]
})
export class SharedDirectivesModule {

}
