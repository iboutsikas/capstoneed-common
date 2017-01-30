import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ProjectActions } from '../Actions/project.actions';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectEffects {

  constructor(private actions: Actions, private chttp: CustomHttp){

  }

  @Effect() loadProjectsForUnit = this.actions
    .ofType(ProjectActions.LOAD_PROJECTS_FOR_UNIT)
    .switchMap(action => this.chttp.get(`${BASE_URL}/projects?unit_id=${action.payload}&includes=students`)
      .map(res => res.json())
      .map(json => json.projects)
      .switchMap(projects => Observable.of(ProjectActions.loadProjectsForUnitSuccess(projects, action.payload)))
    )
    .catch(err => Observable.of(ProjectActions.loadProjectsForUnitFail()));

  @Effect() loadProjectsForAssignment = this.actions
    .ofType(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT)
    .switchMap(action => this.chttp.get(`${BASE_URL}/projects?assignment_id=${action.payload}&includes=students`)
      .map(res => res.json())
      .map(json => json.projects)
      .switchMap(projects => Observable.of(ProjectActions.loadProjectsForAssignmentSuccess(projects, action.payload)))
    )
    .catch(err => Observable.of(ProjectActions.loadProjectsForAssignmentFail()));

  @Effect() loadProject = this.actions
    .ofType(ProjectActions.LOAD_PROJECT)
    .switchMap(action => this.chttp.get(`${BASE_URL}/projects/${action.payload}`)
      .map(res => res.json())
      .map(json => json.project)
      .switchMap(project => Observable.of(ProjectActions.loadProjectSuccess(project)))
    )
    .catch(err => Observable.of(ProjectActions.loadProjectFail()));

  @Effect() deleteProject = this.actions
    .ofType(ProjectActions.DELETE_PROJECT)
    .switchMap(action => this.chttp.delete(`${BASE_URL}/projects/${action.payload}`)
      .switchMap(res => Observable.of(ProjectActions.deleteProjectSuccess(action.payload)))
    )
    .catch(err => Observable.of(ProjectActions.deleteProjectFail()))

}
