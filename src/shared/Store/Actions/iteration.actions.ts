import { Action } from '@ngrx/store';
import { Iteration } from '../Models/iteration';
export class IterationActions {
  public static readonly GET_ALL_SCORED = 'GET_ALL_SCORED';
  public static readonly GET_ALL_SCORED_SUCCESS = 'GET_ALL_SCORED_SUCCESS';
  public static readonly GET_ALL_SCORED_FAIL = 'GET_ALL_SCORED_FAIL';

  public static getAllScored(): Action {
    return {
      type: IterationActions.GET_ALL_SCORED
    }
  }

  public static getAllScoredSuccess(iterations: Iteration[]): Action {
    return {
      type: IterationActions.GET_ALL_SCORED_SUCCESS,
      payload: iterations
    }
  }

  public static getAllScoredFail(err: any): Action {
    return {
      type: IterationActions.GET_ALL_SCORED_FAIL,
      payload: err
    }
  }
}
