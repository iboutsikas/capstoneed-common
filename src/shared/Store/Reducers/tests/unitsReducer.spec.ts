import { unitsReducer } from '../unitsReducer';
import { Unit } from '../../Models/unit';
import { UnitActions } from '../../Actions/unitActions';
import { Action } from '@ngrx/store';
import { UserActions } from '../../Actions/userActions';

describe('Reducer: Units', () => {
  var state: Unit[];

  beforeEach(() => {
    state = [];
  });
  it('should create a new array with the loaded units', () => {
    var expected: Unit[] = [
      {
        id: 1034,
        name: "Open-source optimal moratorium",
        code: "B000AR9H5C",
        semester: "Spring",
        year: 2017
      },
      {
        id: 1035,
        name: "Cross-group modular system engine",
        code: "B000GWGJK2",
        semester: "Spring",
        year: 2016
      }
    ];
    var action = {
      type: UnitActions.LOAD_UNITS_SUCCESS,
      payload: expected
    }

    var actual = unitsReducer(state, action);

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
  });

  it('should remove a deleted unit', () => {
    state = [
      {
        id: 1034,
        name: "Open-source optimal moratorium",
        code: "B000AR9H5C",
        semester: "Spring",
        year: 2017
      },
      {
        id: 1035,
        name: "Cross-group modular system engine",
        code: "B000GWGJK2",
        semester: "Spring",
        year: 2016
      }
    ];

    var action = {
      type: UnitActions.DELETE_UNIT_SUCCESS,
      payload: state[0]
    }

    var actual = unitsReducer(state, action);

    expect(actual).not.toContain(state[0]);
    expect(actual).not.toBe(state);

  });

  it('should empty the list when a user logs out', () => {
    state = [
      {
        id: 1034,
        name: "Open-source optimal moratorium",
        code: "B000AR9H5C",
        semester: "Spring",
        year: 2017
      },
      {
        id: 1035,
        name: "Cross-group modular system engine",
        code: "B000GWGJK2",
        semester: "Spring",
        year: 2016
      }
    ];

    var action: Action = {
      type: UserActions.USER_LOGOUT_SUCCESS
    };

    var actual = unitsReducer(state, action);

    expect(actual).toEqual([]);
  });

});
