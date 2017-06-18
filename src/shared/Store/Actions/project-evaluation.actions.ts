import { Action } from '@ngrx/store';
import { ProjectEvaluation } from '../Models/project-evaluation';
export class ProjectEvaluationActions {
  public static readonly GET_PENDING_EVALUATION = 'GET_PENDING_EVALUATION';
  public static readonly GET_PENDING_EVALUATION_SUCCESS = 'GET_PENDING_EVALUATION_SUCCESS';
  public static readonly GET_PENDING_EVALUATION_FAILED = 'GET_PENDING_EVALUATION_FAILED';
  public static readonly SUBMIT_PROJECT_EVALUATION = 'SUBMIT_PROJECT_EVALUATION';
  public static readonly SUBMIT_PROJECT_EVALUATION_SUCCESS = 'SUBMIT_PROJECT_EVALUATION_SUCCESS';
  public static readonly SUBMIT_PROJECT_EVALUATION_FAIL = 'SUBMIT_PROJECT_EVALUATION_FAIL';


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

  public static submitProjectEvaluation(evaluation: ProjectEvaluation): Action {
    return {
      type: ProjectEvaluationActions.SUBMIT_PROJECT_EVALUATION,
      payload: evaluation
    }
  }

  public static submitProjectEvaluationSuccess(evaluation: ProjectEvaluation): Action {
    return {
      type: ProjectEvaluationActions.SUBMIT_PROJECT_EVALUATION_SUCCESS,
      payload: evaluation
    }
  }

  public static submitProjectEvaluationFail(err: any): Action {
    return {
      type: ProjectEvaluationActions.SUBMIT_PROJECT_EVALUATION_FAIL,
      payload: err
    }
  }
}
