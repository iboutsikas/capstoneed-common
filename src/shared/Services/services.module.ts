import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './authenticationService';
import { CedStoreModule } from '../Store/cedStore.module';
import { XHRBackend, RequestOptions } from '@angular/http';
import { CustomHttp } from './customHttp';
import { UnitService } from './unitService';

@NgModule({
  imports: [CedStoreModule],
  providers: [  ]
})
export class ServicesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthenticationService,
        UnitService,
        {provide: CustomHttp, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
          return new CustomHttp(backend, defaultOptions);
        }, deps: [XHRBackend, RequestOptions]}
      ]
    }
  }
}
