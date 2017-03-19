import { Injectable } from '@angular/core';
import { IAppState } from '../Store/Reducers/index';
import { Store } from '@ngrx/store';
import { AssignmentActions } from '../Store/Actions/assignment.actions';
import { Assignment } from '../Store/Models/assignment';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { CustomHttp } from './customHttp';
import { BASE_URL } from '../Constants/settings';

@Injectable()
export class AssignmentService {

  constructor(private store: Store<IAppState>, private chttp: CustomHttp) {

  }
  // NOTE: Do we need this? it is only used to auto load
  // public getAll(): Observable<Response> {
  //   this.store.dispatch(AssignmentActions.getAll());
  //
  //   return this.chttp.get(`${BASE_URL}/assignments?includes=unit,iterations`)
  //     .map(res => res.json())
  //     .map(json => json.assignment)
  //     .do(assignment => this.store.dispatch(AssignmentActions.getSuccess(assignment)))
  //     .catch(err => {
  //       this.store.dispatch(AssignmentActions.getFail());
  //       return Observable.throw(err);
  //     });
  // }

  public get(assignment_id: number): Observable<Response> {
    this.store.dispatch(AssignmentActions.get(assignment_id));

    return this.chttp.get(`${BASE_URL}/assignments/${assignment_id}?includes=unit,iterations&compact=true`)
      .map(res => res.json())
      .map(json => json.assignment)
      .do(assignment => this.store.dispatch(AssignmentActions.getSuccess(assignment)))
      .catch(err => {
        this.store.dispatch(AssignmentActions.getFail());
        return Observable.throw(err);
      })
  }

  public getAllForUnit(unit_id: number): Observable<Response> {
    this.store.dispatch(AssignmentActions.getAllForUnit(unit_id));

    return this.chttp.get(`${BASE_URL}/assignments?unit_id=${unit_id}&includes=unit,iterations`)
      .map(res => res.json())
      .do(json => this.store.dispatch(AssignmentActions.getAllForUnitSuccess(json.assignments, unit_id)))
      .catch(err => {
        this.store.dispatch(AssignmentActions.getAllForUnitFail(unit_id));
        return Observable.throw(err);
      })
  }

  public create(new_assignment: Assignment): Observable<Response>{
    this.store.dispatch(AssignmentActions.create(new_assignment));

    let json = JSON.stringify(new_assignment);

    return this.chttp.post(`${BASE_URL}/assignments`, json)
      .map(res => res.json())
      .map(json => json.assignment)
      .do(assignment => this.store.dispatch(AssignmentActions.createSuccess(assignment)))
      .catch(err => {
        this.store.dispatch(AssignmentActions.createFail(JSON.parse(err._body)));
        return Observable.throw(err);
      });
  }

  public getIterations(assignment_id: number): Observable<Response> {
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
}
