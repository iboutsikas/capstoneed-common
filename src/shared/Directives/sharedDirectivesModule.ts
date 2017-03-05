import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxContext } from './rxContext';
import { FormWizardComponent } from './formWizard-component/formWizard.component';
import { FormWizardStepComponent } from './formWizardStep - component/formWizardStep.component';
import { ProjectCreatedToast } from './toasts/project-created.toast';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    RxContext,
    FormWizardComponent,
    FormWizardStepComponent,
    ProjectCreatedToast
  ],
  exports: [
    RxContext,
    FormWizardComponent,
    FormWizardStepComponent,
    ProjectCreatedToast
  ]
})
export class SharedDirectivesModule {

}
