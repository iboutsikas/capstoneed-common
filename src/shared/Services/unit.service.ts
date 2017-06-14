import { Injectable } from '@angular/core';
import { CustomHttp } from './customHttp';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { UnitActions } from '../Store/Actions/unit.actions';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BASE_URL } from '../Constants/settings';
import { Unit } from '../Store/Models/unit';

@Injectable()
export class UnitService {
  constructor(private chttp: CustomHttp, private store: Store<IAppState>) {

  }

  public loadUnits(): void {
    this.store.dispatch(UnitActions.loadUnits());
  }

  public loadUnits$(): Observable<Response> {
    return this.chttp.get(BASE_URL + '/units?includes=assignments&compact=true')
      .map(res => res.json().units)
      .do(units => this.store.dispatch(UnitActions.loadUnitsSuccess(units)))
      .catch(err => {
        this.store.dispatch(UnitActions.loadUnitsFail());
        return Observable.throw(err);
      })
  }

  public getUnit(unit_id: number): void {
    this.store.dispatch(UnitActions.loadUnit(unit_id));
  }

  public getUnit$(unit_id: number): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/units/${unit_id}?includes=assignments&compact=true`)
      .map(res => res.json().unit)
      .do(unit => this.store.dispatch(UnitActions.loadUnitSuccess(unit)))
      .catch(err => {
        this.store.dispatch(UnitActions.loadUnitFail());
        return Observable.throw(err);
      })
  }

  public create$(newUnit: Unit): Observable<Response> {
    let json = JSON.stringify(newUnit);

    return this.chttp.post(`${BASE_URL}/units`, json)
      .map(res => res.json())
      .map(json => json.unit)
      .do(unit => this.store.dispatch(UnitActions.createSuccess(unit)))
      .catch(err => {
        this.store.dispatch(UnitActions.createFail(err));
        return Observable.throw(err);
      })
  }

}
