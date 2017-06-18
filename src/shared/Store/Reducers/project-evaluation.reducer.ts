import { ProjectEvaluation } from '../Models/project-evaluation';
import { Action } from '@ngrx/store';
import { ProjectEvaluationActions } from '../Actions/project-evaluation.actions';
import { UserActions } from '../Actions/user.actions';

const INITIAL_STATE = [];

export const project_evaluationReducer = (state: ProjectEvaluation[] = INITIAL_STATE, action: Action): ProjectEvaluation[] => {
  switch(action.type) {

    case ProjectEvaluationActions.GET_PENDING_EVALUATION_SUCCESS: {
      return action.payload;
    }

    case ProjectEvaluationActions.SUBMIT_PROJECT_EVALUATION_SUCCESS: {
      return state.filter(ev => ev.project_id !== action.payload.project_id);
    }

    case UserActions.USER_LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default: return state;
  }
};
