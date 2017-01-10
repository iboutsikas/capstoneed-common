import { Action } from '@ngrx/store';
import { Assignment } from '../Models/assignment';

export class AssignmentActions {

  public static LOAD_ASSIGNMENTS = "LOAD_ASSIGNMENTS";
  public static LOAD_ASSIGNMENTS_SUCCESS = "LOAD_ASSIGNMENTS_SUCCESS";
  public static LOAD_ASSIGNMENTS_FAIL = "LOAD_ASSIGNMENTS_FAIL";
  public static LOAD_ASSIGNMENTS_FOR_UNIT = "LOAD_ASSIGNMENTS_FOR_UNIT";
  public static LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS = "LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS";
  public static LOAD_ASSIGNMENTS_FOR_UNIT_FAIL = "LOAD_ASSIGNMENTS_FOR_UNIT_FAIL";

  public static loadAssignments(): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS
    }
  }

  public static loadAssignmentsSuccess(data: Assignment[]): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_SUCCESS,
      payload: data
    }
  }

  public static loadAssignmentsFail(): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FAIL
    }
  }

  public static loadAssignmentsForUnit(unit_id: number): Action{
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT,
      payload: unit_id
    }
  }

  public static loadAssignmentsForUnitSuccess(data: Assignment[], id: number): Action{
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS,
      payload: {
        assignments: data,
        id: id
      }
    }
  }

  public static loadAssignmentsForUnitFail(unit_id: number): Action{
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_FAIL,
      payload: unit_id
    }
  }
}
