import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Unit } from '../Models/unit';

@Injectable()
export class UnitActions {

  static readonly LOAD_UNITS = 'LOAD_UNITS';
  static readonly LOAD_UNITS_SUCCESS = 'LOAD_UNITS_SUCCESS';
  static readonly DELETE_UNIT_SUCCESS = 'DELETE_UNIT_SUCCESS';

  loadUnits(): Action {
    return {
      type: UnitActions.LOAD_UNITS
    }
  }

  loadUnitsSuccess(units: Unit[]): Action {
    return {
      type: UnitActions.LOAD_UNITS_SUCCESS,
      payload: units
    }
  }

  deleteUnitSuccess(unit: Unit): Action {
    return {
      type: UnitActions.DELETE_UNIT_SUCCESS,
      payload: unit
    }
  }

}
