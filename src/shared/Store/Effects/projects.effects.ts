import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class ProjectEffects {

  constructor(private actions: Actions){

  }

  @Effect() loadProjectsForUnit;
  @Effect() loadProjectsForAssignment;
  @Effect() loadProject;
  @Effect() deleteProject;

}
