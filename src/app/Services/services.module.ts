import { NgModule } from '@angular/core';
import { AuthenticationService } from './authenticationService';
import { CedStoreModule } from '../Store/cedStore.module';

@NgModule({
  imports: [CedStoreModule],
  providers: [AuthenticationService]
})
export class ServicesModule {
}
