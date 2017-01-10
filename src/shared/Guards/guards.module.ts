import { NgModule } from '@angular/core';
import { ServicesModule } from '../Services/services.module';
import { IsAuthenticatedGuard } from './isAuthenticatedGuard';

@NgModule({
  imports: [ServicesModule],
  declarations: [],
  providers: [IsAuthenticatedGuard],
  exports: []
})
export class GuardsModule {

}
