import { Action } from '@ngrx/store';
import { PeerAssessmentForm } from '../Models/peer-assessment-form';
import { QuestionType } from '../Models/question-type';

export class PeerAssessmentActions {
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS';
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS';
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS_FAIL = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS_FAIL';
  public static readonly GET_QUESTION_TYPES = 'GET_QUESTION_TYPES';
  public static readonly GET_QUESTION_TYPES_SUCCEESS = 'GET_QUESTION_TYPES_SUCCEESS';
  public static readonly GET_QUESTION_TYPES_FAIL = 'GET_QUESTION_TYPES_FAIL';

  public static getAllActive(): Action {
    return {
      type: PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS
    }
  }

  public static getAllActiveSuccess(assessments: PeerAssessmentForm[]): Action {
    return {
      type: PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS,
      payload: assessments
    }
  }

  public static getAllActiveFail(err: any): Action {
    return {
      type: PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS_FAIL,
      payload: err
    }
  }

  public static getQuestionTypes(): Action {
    return {
      type: PeerAssessmentActions.GET_QUESTION_TYPES
    }
  }

  public static getQuestionTypesSuccess(types: QuestionType[]): Action {
    return {
      type: PeerAssessmentActions.GET_QUESTION_TYPES_SUCCEESS,
      payload: types
    }
  }

  public static getQuestionTypesFail(err: any): Action {
    return {
      type: PeerAssessmentActions.GET_QUESTION_TYPES_FAIL,
      payload: err
    }
  }
}
