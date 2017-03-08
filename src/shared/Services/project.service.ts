import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { ProjectActions } from '../Store/Actions/project.actions';
import { Project } from '../Store/Models/project';

@Injectable()
export class ProjectService {

  constructor(private store: Store<IAppState>) {

  }

  getProjectsForUnit(unit_id: number): void {
    this.store.dispatch(ProjectActions.loadProjectsForUnit(unit_id));
  }

  getProjectsForAssignment(assignment_id: number): void {
    this.store.dispatch(ProjectActions.loadProjectsForAssignment(assignment_id));
  }

  getProject(project_id: number): void {
    this.store.dispatch(ProjectActions.loadProject(project_id));
  }

  createProject(new_project: Project): void {
    this.store.dispatch(ProjectActions.createProject(new_project));
  }

  enroll(key: string, nickname: string, id: number): void {
    this.store.dispatch(ProjectActions.enroll(key, nickname, id));
  }

}
