import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxContext } from './rxContext';
import { FormWizardComponent } from './formWizard-component/formWizard.component';
import { FormWizardStepComponent } from './formWizardStep - component/formWizardStep.component';
import { ProjectCreatedToast } from './toasts/project-created.toast';
import { RouterModule } from '@angular/router';
import { AssignmentCreatedToast } from './toasts/assignment-created.toast';
import { ProgressArcComponent } from './progress-arc/progress-arc.component';
import { ContrastedTextDirective } from './contrastedTest.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    RxContext,
    FormWizardComponent,
    FormWizardStepComponent,
    ProjectCreatedToast,
    AssignmentCreatedToast,
    ProgressArcComponent,
    ContrastedTextDirective
  ],
  exports: [
    RxContext,
    FormWizardComponent,
    FormWizardStepComponent,
    ProjectCreatedToast,
    ProgressArcComponent,
    ContrastedTextDirective
  ],
  entryComponents: [
    ProjectCreatedToast,
    AssignmentCreatedToast
  ],
})
export class SharedDirectivesModule {

}
