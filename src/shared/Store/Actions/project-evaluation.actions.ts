import { Action } from '@ngrx/store';
import { ProjectEvaluation } from '../Models/project-evaluation';
export class ProjectEvaluationActions {
  public static readonly GET_PENDING_EVALUATION = 'GET_PENDING_EVALUATION';
  public static readonly GET_PENDING_EVALUATION_SUCCESS = 'GET_PENDING_EVALUATION_SUCCESS';
  public static readonly GET_PENDING_EVALUATION_FAILED = 'GET_PENDING_EVALUATION_FAILED';

  public static getPending(): Action {
    return {
      type: ProjectEvaluationActions.GET_PENDING_EVALUATION
    }
  }

  public static getPendingSucces(evaluations: ProjectEvaluation[]) {
    return {
      type: ProjectEvaluationActions.GET_PENDING_EVALUATION_SUCCESS,
      payload: evaluations
    }
  }

  public static getPendingFail(err: any) {
    return {
      type: ProjectEvaluationActions.GET_PENDING_EVALUATION_FAILED,
      payload: err
    }
  }
}
