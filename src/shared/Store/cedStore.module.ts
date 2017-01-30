import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import rootReducer from './Reducers';
import { UserActions } from './Actions/userActions';
import { UserEffects } from './Effects/userEffects';
import { UnitEffects } from './Effects/unitEffects';
import { AssignmentEffects } from './Effects/assignmentEffects';
import { RoutingEffects } from './Effects/routingEffects';
import { ProjectEffects } from './Effects/projects.effects';

@NgModule({
  providers: [UserActions]
})
export class CedStoreModule {
  static provideStore() {
    return [
      StoreModule.provideStore(rootReducer),
      StoreDevtoolsModule.instrumentOnlyWithExtension(),
      EffectsModule.run(UserEffects),
      EffectsModule.run(UnitEffects),
      EffectsModule.run(ProjectEffects),
      EffectsModule.run(AssignmentEffects),
      EffectsModule.runAfterBootstrap(RoutingEffects)
    ]
  }
}
