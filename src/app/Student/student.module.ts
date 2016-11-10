import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentHomeComponent } from './studentHome.component';

@NgModule({
  declarations: [StudentHomeComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: StudentHomeComponent }
    ])
  ]
})
export class StudentModule {

}
