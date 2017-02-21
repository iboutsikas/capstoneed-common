import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import rootReducer from './Reducers';
import { UserActions } from './Actions/user.actions';
import { UserEffects } from './Effects/user.effects';
import { UnitEffects } from './Effects/unit.effects';
import { AssignmentEffects } from './Effects/assignment.effects';
import { RoutingEffects } from './Effects/routing.effects';
import { ProjectEffects } from './Effects/project.effects';

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
