import { Action } from '@ngrx/store';
import { PeerAssessmentForm } from '../Models/peer-assessment-form';

export class PeerAssessmentActions {
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS';
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS';
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS_FAIL = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS_FAIL';

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
}
