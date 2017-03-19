import { Injectable } from '@angular/core';
import { CustomHttp } from './customHttp';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { UnitActions } from '../Store/Actions/unit.actions';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { BASE_URL } from '../Constants/settings';

@Injectable()
export class UnitService {
  constructor(private chttp: CustomHttp, private store: Store<IAppState>) {

  }
  // NOTE: Leave as is, used for auto-loading mainly
  public loadUnits(): void {
    this.store.dispatch(UnitActions.loadUnits());
  }

  public getUnit(unit_id: number): Observable<Response> {
    this.store.dispatch(UnitActions.loadUnit(unit_id));

    return this.chttp.get(`${BASE_URL}/units/${unit_id}?include=assignments&compact=true`)
      .map(res => res.json().unit)
      .do(unit => this.store.dispatch(UnitActions.loadUnitSuccess(unit)))
      .catch(err => {
        this.store.dispatch(UnitActions.loadUnitFail());
        return Observable.throw(err);
      })
  }

}
