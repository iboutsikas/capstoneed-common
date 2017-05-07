import { Injectable } from '@angular/core';
import { IAppState } from '../Store/Reducers/index';
import { Store } from '@ngrx/store';
import { AssignmentActions } from '../Store/Actions/assignment.actions';
import { Assignment } from '../Store/Models/assignment';
import { Response } from '@angular/http';
import { CustomHttp } from './customHttp';
import { BASE_URL } from '../Constants/settings';
import { Observable } from 'rxjs/Rx';
import { GameSettings } from "../Store/Models/game-settings";

@Injectable()
export class AssignmentService {

  constructor(private store: Store<IAppState>, private chttp: CustomHttp) {

  }
  // NOTE: Do we need this? it is only used to auto load
  public getAll(): void {
    this.store.dispatch(AssignmentActions.getAll());
  }

  public get(assignment_id: number):void {
    this.store.dispatch(AssignmentActions.get(assignment_id));
  }

  public get$(assignment_id: number): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/assignments/${assignment_id}?includes=unit,iterations&compact=true`)
      .map(res => res.json())
      .map(json => json.assignment)
      .do(assignment => this.store.dispatch(AssignmentActions.getSuccess(assignment)))
      .catch(err => {
        this.store.dispatch(AssignmentActions.getFail());
        return Observable.throw(err);
      })
  }

  public getAllForUnit(unit_id: number): void {
    this.store.dispatch(AssignmentActions.getAllForUnit(unit_id));
  }

  public getAllForUnit$(unit_id: number): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/assignments?unit_id=${unit_id}&includes=unit,iterations`)
      .map(res => res.json())
      .do(json => this.store.dispatch(AssignmentActions.getAllForUnitSuccess(json.assignments, unit_id)))
      .catch(err => {
        this.store.dispatch(AssignmentActions.getAllForUnitFail(unit_id));
        return Observable.throw(err);
      })
  }

  public create(new_assignment: Assignment): void {
    let data = {
      id: new_assignment.id,
      unit_id: new_assignment.unit_id,
      name: new_assignment.name,
      start_date: new_assignment.start_date,
      end_date: new_assignment.end_date,
      iterations_attributes: new_assignment.iterations
    };

    this.store.dispatch(AssignmentActions.create(data));
  }


  public create$(new_assignment: Assignment): Observable<Response> {

    let data = {
      unit_id: new_assignment.unit_id,
      name: new_assignment.name,
      start_date: new_assignment.start_date,
      end_date: new_assignment.end_date,
      iterations_attributes: new_assignment.iterations
    };

    let json = JSON.stringify(data);

    return this.chttp.post(`${BASE_URL}/assignments`, json)
      .map(res => res.json())
      .map(json => json.assignment)
      .do(assignment => this.store.dispatch(AssignmentActions.createSuccess(assignment)))
      .catch(err => {
        this.store.dispatch(AssignmentActions.createFail(JSON.parse(err._body)));
        return Observable.throw(err);
      });
  }

  public getIterations(assignment_id: number): void {
    this.store.dispatch(AssignmentActions.getIterations(assignment_id));
  }
  public getIterations$(assignment_id: number): Observable<Response> {
    this.store.dispatch(AssignmentActions.getIterations(assignment_id));

    return this.chttp.get(`${BASE_URL}/iterations?assignment_id=${assignment_id}`)
      .map(res => res.json())
      .map(json => json.iterations)
      .do(iterations => this.store.dispatch(AssignmentActions.getIterationsSuccess(iterations, assignment_id)))
      .catch(err => {
        this.store.dispatch(AssignmentActions.getIterationsFail(err));
        return Observable.throw(err);
      })
  }

  public getGameSettings$(assignment_id: number): Observable<GameSettings> {
    return this.chttp.get(`${BASE_URL}/assignments/${assignment_id}/game_settings`)
      .map(res => res.json())
      .map(json => json.game_settings)
  }

  public updateGameSettings$(game_settings: GameSettings, assignment_id: number) {
    let data = JSON.stringify(game_settings);

    return this.chttp.post(`${BASE_URL}/assignments/${assignment_id}/game_settings`, data)
      .map(res => res.json())
      .map(json => json.game_settings);
  }
}
