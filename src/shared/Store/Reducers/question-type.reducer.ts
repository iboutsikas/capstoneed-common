import { ActionReducer, Action } from '@ngrx/store';
import { QuestionType } from '../Models/question-type';
import { PeerAssessmentActions } from '../Actions/peer-assessment.actions';
import { UserActions } from '../Actions/user.actions';


const INITIAL_STATE: QuestionType[] = [];

export const questionTypeReducer: ActionReducer<QuestionType[]> = (state: QuestionType[] = INITIAL_STATE, action: Action) => {
  switch(action.type) {
    case  PeerAssessmentActions.GET_QUESTION_TYPES_SUCCESS: {
      return [...action.payload];
    }
    case UserActions.USER_LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default: { return state; }
  }
};
