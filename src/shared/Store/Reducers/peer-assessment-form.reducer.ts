import { Action } from '@ngrx/store';
import { PeerAssessmentForm } from '../Models/peer-assessment-form';
import { PeerAssessmentActions } from '../Actions/peer-assessment.actions';
import { UserActions } from '../Actions/user.actions';

const INITIAL_STATE: PeerAssessmentForm[] = [];

export const pa_formReducer = (state: PeerAssessmentForm[] = INITIAL_STATE, action: Action) => {
  switch(action.type) {
    case PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS: {
      return [...action.payload];
    }
    case UserActions.USER_LOGOUT_SUCCESS : {
      return INITIAL_STATE;
    }
    default: return state;
  }
};
