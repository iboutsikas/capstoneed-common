import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ProjectActions } from '../Actions/project.actions';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL, THROTTLE_TIME } from '../../Constants/settings';
import { Observable } from 'rxjs';
import { UserActions } from '../Actions/user.actions';
import { ToastrService, ToastConfig } from 'ngx-toastr';
import { ProjectCreatedToast } from '../../Directives/toasts/project-created.toast';
import { Project } from '../Models/project';
import { ProjectService } from '../../Services/project.service';

@Injectable()
export class ProjectEffects {

  constructor(private actions: Actions, private chttp: CustomHttp, private toastrService: ToastrService, private projectService: ProjectService){

  }

  @Effect() autoloadProjectsOnLogin = this.actions
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .switchMap(action => Observable.of(ProjectActions.loadProjects()));

  @Effect() loadProjects = this.actions
    .ofType(ProjectActions.LOAD_PROJECTS)
    .throttleTime(Math.random() * THROTTLE_TIME + 1)
    .switchMap(action => this.chttp.get(`${BASE_URL}/projects?includes=students,unit,assignment`)
      .map(res => res.json())
      .map(json => json.projects)
      .switchMap(projects => Observable.of(ProjectActions.loadProjectsSuccess(projects)))
      .catch(err => Observable.of(ProjectActions.loadProjectsFail()))
    );

  @Effect() loadProjectsForUnit = this.actions
    .ofType(ProjectActions.LOAD_PROJECTS_FOR_UNIT)
    // .throttleTime(Math.random() * THROTTLE_TIME + 1)
    .switchMap(action => this.chttp.get(`${BASE_URL}/projects?unit_id=${action.payload}&includes=students`)
      .map(res => res.json())
      .map(json => json.projects)
      .switchMap(projects => Observable.of(ProjectActions.loadProjectsForUnitSuccess(projects, action.payload)))
      .catch(err => Observable.of(ProjectActions.loadProjectsForUnitFail()))
    );

  @Effect() loadProjectsForAssignment = this.actions
    .ofType(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT)
    // .throttleTime(Math.random() * THROTTLE_TIME + 1)
    .switchMap(action => this.chttp.get(`${BASE_URL}/projects?assignment_id=${action.payload}&includes=students`)
      .map(res => res.json())
      .map(json => json.projects)
      .switchMap(projects => Observable.of(ProjectActions.loadProjectsForAssignmentSuccess(projects, action.payload)))
      .catch(err => Observable.of(ProjectActions.loadProjectsForAssignmentFail()))
    );

  @Effect() loadProject = this.actions
    .ofType(ProjectActions.LOAD_PROJECT)
    // .throttleTime(Math.random() * THROTTLE_TIME + 1)
    .switchMap(action => this.chttp.get(`${BASE_URL}/projects/${action.payload}?includes=unit,students`)
      .map(res => res.json())
      .map(json => json.project)
      .switchMap(project => Observable.of(ProjectActions.loadProjectSuccess(project)))
      .catch(err => Observable.of(ProjectActions.loadProjectFail()))
    );

  @Effect() deleteProject = this.actions
    .ofType(ProjectActions.DELETE_PROJECT)
    // .throttleTime(Math.random() * THROTTLE_TIME + 1)
    .switchMap(action => this.chttp.delete(`${BASE_URL}/projects/${action.payload}`)
      .switchMap(res => Observable.of(ProjectActions.deleteProjectSuccess(action.payload)))
      .catch(err => Observable.of(ProjectActions.deleteProjectFail()))
    );

  @Effect() createProject = this.actions
    .ofType(ProjectActions.CREATE_PROJECT)
    // .throttleTime(Math.random() * THROTTLE_TIME + 1)
    .map(action => JSON.stringify(action.payload))
    .switchMap(json => this.chttp.post(`${BASE_URL}/projects`, json)
      .map(res => res.json())
      .map(json => json.project)
      .switchMap(project=> Observable.of(ProjectActions.createProjectSuccess(project)))
      .catch(err => Observable.of(ProjectActions.createProjectFail(err)))
    );

  @Effect({ dispatch: false }) projectCreatedMessage = this.actions
    .ofType(ProjectActions.CREATE_PROJECT_SUCCESS)
    .map(action => action.payload)
    .switchMap((p: Project) => {

      let config: ToastConfig = {
        toastComponent: ProjectCreatedToast
      };

      let result = this.toastrService.success(`I successfully created your project!`, 'Success', config);;
      (result.portal.instance as ProjectCreatedToast).entity = p;
      (result.portal.instance as ProjectCreatedToast).service = this.projectService;
      return Observable.of(null);
    });

  @Effect() enrollInProject = this.actions
    .ofType(ProjectActions.ENROLL_IN_PROJECT)
    .map(action => action.payload)
    .map((payload: {key, nickname, id }) => JSON.stringify(payload))
    .switchMap(json => this.chttp.post(`${BASE_URL}/projects/enrol`,json)
      .map(res => res.json())
      .map(json => json.project)
      .switchMap(project => Observable.of(ProjectActions.enrollSuccess(project)))
      .catch(err => Observable.of(ProjectActions.enrollFail(err)))
    )

  @Effect() removeStudentFromProject = this.actions
    .ofType(ProjectActions.REMOVE_STUDENT)
    .switchMap(action => this.chttp.delete(`${BASE_URL}/projects/${action.payload['project_id']}/remove_student`, JSON.stringify(action.payload['student_id']))
      .map(res => res.json())
      .switchMap(res => Observable.of(ProjectActions.removeStudentSuccess(action.payload['project_id'], action.payload['student_id'])))
      .catch(err => Observable.of(ProjectActions.removeStudentFail(err)))
    );

  @Effect({ dispatch: false }) studentRemovedMessage = this.actions
    .ofType(ProjectActions.REMOVE_STUDENT_SUCCESS)
    .map(action => action.payload)
    .switchMap((p: Project) => {

      let config: ToastConfig = {
        toastComponent: ProjectCreatedToast
      };

      let result = this.toastrService.success(`Student removed from project`, 'Success', config);;
      (result.portal.instance as ProjectCreatedToast).entity = p;
      (result.portal.instance as ProjectCreatedToast).service = this.projectService;
      return Observable.of(null);
    });    
}
