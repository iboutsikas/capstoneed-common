import { Action, ActionReducer } from '@ngrx/store';
import { ProjectRanking } from '../Models/project-ranking';
import { UserActions } from '../Actions/user.actions';
import { ProjectActions } from '../Actions/project.actions';

const INITIAL_STATE = [];

export const projectRankingReducer: ActionReducer<ProjectRanking[]> = (state: ProjectRanking[] = INITIAL_STATE, action: Action) => {
  switch(action.type) {

    case ProjectActions.GET_PROJECT_RANKINGS_SUCCESS: {
      return [...action.payload];
    }

    case UserActions.USER_LOGOUT_SUCCESS: {
      return [];
    }
    default: return state;
  }
};
