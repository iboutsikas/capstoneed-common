import { NgModule } from '@angular/core';
import { AuthenticationService } from './authenticationService';
import { CedStoreModule } from '../Store/cedStore.module';
import { XHRBackend, RequestOptions } from '@angular/http';
import { CustomHttp } from './customHttp';

@NgModule({
  imports: [CedStoreModule],
  providers: [
    AuthenticationService,
    {provide: CustomHttp, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
      return new CustomHttp(backend, defaultOptions);
    }, deps: [XHRBackend, RequestOptions]}
  ]
})
export class ServicesModule {
}
