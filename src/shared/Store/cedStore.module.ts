import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { EffectsModule } from '@ngrx/effects';

import rootReducer from './Reducers';
import { UserActions } from './Actions/userActions';
import { UserEffects } from './Effects/userEffects';
import { RoutingEffects } from './Effects/routingEffects';

@NgModule({
  providers: [UserActions]
})
export class CedStoreModule {
  static provideStore() {
    return [
      StoreModule.provideStore(rootReducer),
      StoreDevtoolsModule.instrumentStore({
        monitor: useLogMonitor({
          visible: true,
          position: "bottom"
        })
      }),
      StoreLogMonitorModule,
      EffectsModule.run(UserEffects),
      EffectsModule.runAfterBootstrap(RoutingEffects)
    ]
  }
}
