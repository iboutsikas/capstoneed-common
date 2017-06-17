import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Unit } from '../Models/unit';

@Injectable()
export class UnitActions {

  static readonly LOAD_UNITS = 'LOAD_UNITS';
  static readonly LOAD_UNITS_SUCCESS = 'LOAD_UNITS_SUCCESS';
  static readonly LOAD_UNITS_FAIL = 'LOAD_UNITS_FAIL';
  static readonly LOAD_UNIT = 'LOAD_UNIT';
  static readonly LOAD_UNIT_SUCCESS = 'LOAD_UNIT_SUCCESS';
  static readonly LOAD_UNIT_FAIL = 'LOAD_UNIT_FAIL';
  static readonly DELETE_UNIT = 'DELETE_UNIT';
  static readonly DELETE_UNIT_SUCCESS = 'DELETE_UNIT_SUCCESS';
  static readonly CREATE_UNIT_SUCCESS = 'CREATE_UNIT_SUCCESS';
  static readonly CREATE_UNIT_FAIL = 'CREATE_UNIT_FAIL';
  static readonly ARCHIVE_UNIT = 'ARCHIVE_UNIT';
  static readonly ARCHIVE_UNIT_SUCCESS = 'ARCHIVE_UNIT_SUCCESS';
  static readonly ARCHIVE_UNIT_FAIL = 'ARCHIVE_UNIT_FAIL';

  public static loadUnits(): Action {
    return {
      type: UnitActions.LOAD_UNITS
    }
  }

  public static loadUnitsSuccess(units: Unit[]): Action {
    return {
      type: UnitActions.LOAD_UNITS_SUCCESS,
      payload: units
    }
  }

  public static loadUnitsFail(): Action {
    return {
      type: UnitActions.LOAD_UNITS_FAIL
    }
  }

  public static loadUnit(unit_id: number): Action {
    return {
      type: UnitActions.LOAD_UNIT,
      payload: unit_id
    }
  }

  public static loadUnitSuccess(new_unit: Unit): Action {
    return {
      type: UnitActions.LOAD_UNIT_SUCCESS,
      payload: new_unit
    }
  }



  public static loadUnitFail(): Action {
    return {
      type: UnitActions.LOAD_UNIT_FAIL
    }
  }

  public static deleteUnit(unitId: number): Action {
    return {
      type: UnitActions.DELETE_UNIT,
      payload: unitId
    }
  }

  public static deleteUnitSuccess(unitId: number): Action {
    return {
      type: UnitActions.DELETE_UNIT_SUCCESS,
      payload: unitId
    }
  }

  public static createSuccess(unit: Unit): Action {
    return {
      type: UnitActions.CREATE_UNIT_SUCCESS,
      payload: unit
    }
  }

  public static createFail(errors): Action {
    return {
      type: UnitActions.CREATE_UNIT_FAIL,
      payload: errors
    }
  }

  public static archiveUnit(unitId: number): Action {
    return {
      type: UnitActions.ARCHIVE_UNIT,
      payload: unitId
    }
  }

  public static archiveUnitSuccess(unit: Unit): Action {
    return {
      type: UnitActions.ARCHIVE_UNIT_SUCCESS,
      payload: unit
    }
  }

  public static archiveUnitFail(errors): Action {
    return {
      type: UnitActions.ARCHIVE_UNIT_FAIL,
      payload: errors
    }
  }
}
