import { Action } from '@ngrx/store';
import { UnitActions } from '../unitActions';
import { Unit } from '../../Models/unit';
describe('Actions: Unit', () => {

  let testUnits: Unit[];

  beforeEach(() => {
    testUnits = [
      {
        id: 2,
        name: "Unit 436",
        code: "DvSu6c+9DzWZ2A==",
        semester: "Autumn",
        year: 2014,
        archived_at: null,
        department: {
          id: 2,
          university: "University of 67995",
          name: "Computer Science17858"
        }
      },
      {
        id: 1,
        name: "Unit 568",
        code: "2hkwFUu7zNOvyw==",
        semester: "Spring",
        year: 2015,
        archived_at: null,
        department: {
          id: 1,
          university: "University of 35362",
          name: "Computer Science21265"
        }
      }
    ];
  });

  it('should create LOAD_UNIT action', () => {
    let expected: Action = {
      type: UnitActions.LOAD_UNITS
    };

    let actual = UnitActions.loadUnits();

    expect(actual.type).toEqual(expected.type);
    expect(actual.payload).not.toBeDefined()
  });

  it('should create a LOAD_UNITS_SUCCESS action', () => {

    let expected: Action = {
      type: UnitActions.LOAD_UNITS_SUCCESS,
      payload: testUnits
    };

    let actual = UnitActions.loadUnitsSuccess(testUnits);

    expect(actual.type).toEqual(expected.type);
    expect(actual.payload).toEqual(expected.payload);
  });

  it('should create LOAD_UNIT_FAIL action', () => {
    let expected: Action = {
      type: UnitActions.LOAD_UNITS_FAIL
    };

    let actual = UnitActions.loadUnitsFail();

    expect(actual.type).toEqual(expected.type);
    expect(actual.payload).not.toBeDefined()
  });

  it('should create a DELETE_UNIT action', () => {
    let expected: Action = {
      type: UnitActions.DELETE_UNIT,
      payload: 5
    };

    let actual = UnitActions.deleteUnit(5);

    expect(actual.type).toEqual(expected.type);
    expect(actual.payload).toEqual(expected.payload);
  });

  it('should create a DELETE_UNIT_SUCCESS action', () => {
    let expected: Action = {
      type: UnitActions.DELETE_UNIT_SUCCESS,
      payload: 5
    };

    let actual = UnitActions.deleteUnitSuccess(5);

    expect(actual.type).toEqual(expected.type);
    expect(actual.payload).toEqual(expected.payload);
  });



});
