import { Action } from '@ngrx/store';
import { PeerAssessmentForm } from '../Models/peer-assessment-form';
import { PeerAssessmentActions } from '../Actions/peer-assessment.actions';
import { UserActions } from '../Actions/user.actions';

const INITIAL_STATE: PeerAssessmentForm[] = [];

export const pa_formReducer = (state: PeerAssessmentForm[] = INITIAL_STATE, action: Action) => {
  switch(action.type) {
    case PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS: {
      return [...action.payload].sort((a: PeerAssessmentForm, b: PeerAssessmentForm) => a.id - b.id);
    }
    case PeerAssessmentActions.GET_PEER_ASSESSMENT_FORM_SUCCESS: {
      let remaining = state.filter((pa: PeerAssessmentForm) => pa.id != action.payload.id)
      return [...remaining, action.payload].sort((a: PeerAssessmentForm, b: PeerAssessmentForm) => a.id - b.id);
    }
    case UserActions.USER_LOGOUT_SUCCESS : {
      return INITIAL_STATE;
    }
    default: return state;
  }
};
