import { Action } from '@ngrx/store';
import { Assignment } from '../Models/assignment';
import { Iteration } from '../Models/iteration';

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
  public static readonly CREATE_ASSIGNMENT = "CREATE_ASSIGNMENT";
  public static readonly CREATE_ASSIGNMENT_SUCCESS = "CREATE_ASSIGNMENT_SUCCESS";
  public static readonly CREATE_ASSIGNMENT_FAIL = "CREATE_ASSIGNMENT_FAIL";
  public static readonly GET_ITERATIONS_FOR_ASSIGNMENT = "GET_ITERATIONS_FOR_ASSIGNMENT";
  public static readonly GET_ITERATIONS_FOR_ASSIGNMENT_SUCCESS = "GET_ITERATIONS_FOR_ASSIGNMENT_SUCCESS";
  public static readonly GET_ITERATIONS_FOR_ASSIGNMENT_FAIL = "GET_ITERATIONS_FOR_ASSIGNMENT_FAIL";



  public static get(assignment_id: number): Action {
   return {
     type: AssignmentActions.LOAD_ASSIGNMENT,
     payload: assignment_id
   }
  }

  public static getSuccess(data: Assignment): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENT_SUCCESS,
      payload: data
    }
  }

  public static getFail(): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENT_FAIL
    }
  }


  public static getAll(): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS
    }
  }

  public static getAllSuccess(data: Assignment[]): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_SUCCESS,
      payload: data
    }
  }

  public static getAllFail(): Action {
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FAIL
    }
  }

  public static getAllForUnit(unit_id: number): Action{
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT,
      payload: unit_id
    }
  }

  public static getAllForUnitSuccess(data: Assignment[], id: number): Action{
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS,
      payload: {
        assignments: data,
        id: id
      }
    }
  }

  public static getAllForUnitFail(unit_id: number): Action{
    return {
      type: AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_FAIL,
      payload: unit_id
    }
  }

  public static create(new_assignment: Assignment): Action {
    return {
      type: AssignmentActions.CREATE_ASSIGNMENT,
      payload: new_assignment
    }
  }

  public static createSuccess(new_assignment: Assignment): Action {
    return {
      type: AssignmentActions.CREATE_ASSIGNMENT_SUCCESS,
      payload: new_assignment
    }
  }

  public static createFail(err?: any): Action {
    return {
      type: AssignmentActions.CREATE_ASSIGNMENT_FAIL,
      payload: err
    }
  }

  public static getIterations(assignment_id: number): Action {
    return {
      type: AssignmentActions.GET_ITERATIONS_FOR_ASSIGNMENT,
      payload: assignment_id
    }
  }

  public static getIterationsSuccess(iterations: Iteration[], assignment_id: number): Action {
    return {
      type: AssignmentActions.GET_ITERATIONS_FOR_ASSIGNMENT_SUCCESS,
      payload: {
        iterations: iterations,
        assignment_id: assignment_id
      }
    }
  }

  public static getIterationsFail(err: any): Action {
    return {
      type: AssignmentActions.GET_ITERATIONS_FOR_ASSIGNMENT_FAIL,
      payload: err
    }
  }
}
