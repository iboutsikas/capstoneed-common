import { Injectable } from '@angular/core';
import { CustomHttp } from './customHttp';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { UnitActions } from '../Store/Actions/unitActions';

@Injectable()
export class UnitService {
  constructor(private _chttp: CustomHttp, private _store: Store<IAppState>) {

  }

  public loadUnits(): void {
    this._store.dispatch(UnitActions.loadUnits());
  }


}
