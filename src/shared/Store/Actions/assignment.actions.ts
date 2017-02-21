import { Action } from '@ngrx/store';
import { Assignment } from '../Models/assignment';

export class AssignmentActions {

  public static readonly LOAD_ASSIGNMENT = "LOAD_ASSIGNMENT";
  public static readonly LOAD_ASSIGNMENT_SUCCESS = "LOAD_ASSIGNMENT_SUCCESS";
  public static readonly LOAD_ASSIGNMENT_FAIL = "LOAD_ASSIGNMENT_FAIL";
  public static readonly LOAD_ASSIGNMENTS = "LOAD_ASSIGNMENTS";
  public static readonly LOAD_ASSIGNMENTS_SUCCESS = "LOAD_ASSIGNMENTS_SUCCESS";
  public static readonly LOAD_ASSIGNMENTS_FAIL = "LOAD_ASSIGNMENTS_FAIL";
  public static readonly LOAD_ASSIGNMENTS_FOR_UNIT = "LOAD_ASSIGNMENTS_FOR_UNIT";
  public static readonly LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS = "LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS";
  public static readonly LOAD_ASSIGNMENTS_FOR_UNIT_FAIL = "LOAD_ASSIGNMENTS_FOR_UNIT_FAIL";


  public static loadAssignment(assignment_id: number): Action {
   return {
     type: AssignmentActions.LOAD_ASSIGNMENT,
     payload: assignment_id
   }
  }

  public static loadAssignmentSuccess(data: Assignment): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENT_SUCCESS,
      payload: data
    }
  }

  public static loadAssignmentFail(): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENT_FAIL
    }
  }


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
