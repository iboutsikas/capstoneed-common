import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { ProjectActions } from '../Store/Actions/project.actions';
import { Project } from '../Store/Models/project';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { BASE_URL } from '../Constants/settings';
import { CustomHttp } from './customHttp';
import { ProjectRanking } from '../Store/Models/project-ranking';
import { Feeling } from '../Store/Models/feeling';
import { ProjectEvaluation } from '../Store/Models/project-evaluation';
import { ProjectEvaluationActions } from '../Store/Actions/project-evaluation.actions';

@Injectable()
export class ProjectService {

  constructor(private store: Store<IAppState>, private chttp: CustomHttp) {

  }

  getAllActive(): void {
    this.store.dispatch(ProjectActions.getAllActive());
  }

  getAllActive$(): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/projects?includes=students,unit,assignment`)
      .map(res => res.json())
      .map(json => json.projects)
      .do(projects => this.store.dispatch(ProjectActions.getAllActiveSuccess(projects)))
      .catch(err => {
        this.store.dispatch(ProjectActions.getAllActiveFail());
        return Observable.throw(err);
      })
  }

  getAllActiveForUnit(unit_id: number): void {
    this.store.dispatch(ProjectActions.getAllActiveForUnit(unit_id));
  }

  getAllActiveForUnit$(unit_id: number): Observable<Response> {

    return this.chttp.get(`${BASE_URL}/projects?unit_id=${unit_id}&includes=students`)
      .map(res => res.json())
      .map(json => json.projects)
      .do(projects => this.store.dispatch(ProjectActions.getAllActiveForUnitSuccess(projects, unit_id)))
      .catch(err => {
        this.store.dispatch(ProjectActions.getAllActiveForUnitFail());
        return Observable.throw(err);
      })
  }

  getAllActiveForAssignment(assignment_id: number): void {
    this.store.dispatch(ProjectActions.getAllActiveForAssignment(assignment_id));
  }

  getAllActiveForAssignment$(assignment_id: number): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/projects?assignment_id=${assignment_id}&includes=students`)
      .map(res => res.json())
      .map(json => json.projects)
      .do(projects => this.store.dispatch(ProjectActions.getAllActiveForAssignmentSuccess(projects, assignment_id)))
      .catch(err => {
        this.store.dispatch(ProjectActions.getAllActigeForAssignmentFail());
        return Observable.of(err);
      })
  }

  get(project_id: number): void {
    this.store.dispatch(ProjectActions.get(project_id));
  }

  get$(project_id: number): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/projects/${project_id}?includes=unit,students`)
      .map(res => res.json())
      .map(json => json.project)
      .do(project => this.store.dispatch(ProjectActions.getSuccess(project)))
      .catch(err => {
        this.store.dispatch(ProjectActions.getFail());
        return Observable.throw(err);
      })
  }
  create(new_project: Project): void {
    this.store.dispatch(ProjectActions.create(new_project));
  }

  create$(new_project: Project): Observable<Response> {
    let json = JSON.stringify(new_project);

    return this.chttp.post(`${BASE_URL}/projects`, json)
      .map(res => res.json())
      .map(json => json.project)
      .do(project=> this.store.dispatch(ProjectActions.createSuccess(project)))
      .catch(err => {
        this.store.dispatch(ProjectActions.createFail(err));
        return Observable.throw(err);
      })
  }

  enroll(key: string, nickname: string, id: number): void {
    this.store.dispatch(ProjectActions.enroll(key, nickname, id));
  }

  enroll$(key: string, nickname: string, id: number): Observable<Response> {
    let json = JSON.stringify({
      key: key,
      nickname: nickname,
      id: id
    });

    return this.chttp.post(`${BASE_URL}/projects/enrol`,json)
      .map(res => res.json())
      .map(json => json.project)
      .do(project => this.store.dispatch(ProjectActions.enrollSuccess(project)))
      .catch(err => {
        this.store.dispatch(ProjectActions.enrollFail(err));
        return Observable.throw(err);
      })
  }

  removeStudent(project_id: number, student_id: number): void {
    this.store.dispatch(ProjectActions.removeStudent(project_id, student_id));
  }

  removeStudent$(project_id: number, student_id: number): Observable<Response> {

    return this.chttp.delete(`${BASE_URL}/projects/${project_id}/remove_student?student_id=${student_id}`)
      .map(res => res.json())
      .do(res => this.store.dispatch(ProjectActions.removeStudentSuccess(project_id, student_id)))
      .catch(err => {
        this.store.dispatch(ProjectActions.removeStudentFail(err));
        return Observable.throw(err);
      })
  }

  getProjectRankings(assignment_id: number): void {
    this.store.dispatch(ProjectActions.getProjectRankings(assignment_id));
  }

  getProjectRankings$(assignment_id: number): Observable<ProjectRanking[]> {
    return this.chttp.get(`${BASE_URL}/assignments/${assignment_id}/points`)
      .map(res => res.json())
      .map(json => json.points)
      .do(rankings => this.store.dispatch(ProjectActions.getProjectRankingsSuccess(rankings)))
      .catch(err => {
        this.store.dispatch(ProjectActions.getProjectRankingsFail(err));
        return Observable.throw(err);
      })
  }

  public updateProject(newProject: Project): void {
    this.store.dispatch(ProjectActions.updateProject(newProject));
  }

  public updateProject$(newProject: Project): Observable<Project> {
    let json = JSON.stringify(newProject);

    return this.chttp.patch(`${BASE_URL}/projects/${newProject.id}`, json)
      .map(res => res.json())
      .map(json => json.project)
      .do(project => this.store.dispatch(ProjectActions.updateProjectSuccess(project)))
      .catch(err => {
        this.store.dispatch(ProjectActions.updateProjectFail(err));
        return Observable.throw(err);
      })
  }

  public getFeelings(): Observable<Feeling[]> {
    return this.chttp.get(`${BASE_URL}/feelings`)
      .map(res => res.json())
      .map(json => json.feelings)
  }

  public submitProjectEvaluation(evaluation: ProjectEvaluation) {
    let json = JSON.stringify(evaluation);

    return this.chttp.post(`${BASE_URL}/projects/${evaluation.project_id}/evaluations`, json)
      .map(res => res.json())
      .map(json => json.points.points_earned)
  }

  public getPendingEvalations() {
    this.store.dispatch(ProjectEvaluationActions.getPending());
  }

}
