import { Project } from '../Models/project';
import { Action, ActionReducer } from '@ngrx/store';
import { UserActions } from '../Actions/user.actions';
import { ProjectActions } from '../Actions/project.actions';

const INITIAL_STATE: Project[] = [];

export const projectsReducer: ActionReducer<Project[]> = (state: Project[] = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ProjectActions.LOAD_PROJECTS_SUCCESS:
      return [...action.payload].sort((a:Project, b:Project) => a.id - b.id);

    case ProjectActions.LOAD_PROJECTS_FOR_UNIT_SUCCESS:
      let rest = state.filter((p: Project) => p.unit_id != action.payload.unit_id);

      return [...rest, ...action.payload.projects].sort((a:Project, b:Project) => a.id - b.id);

    case ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS:
      rest = state.filter((p: Project) => p.assignment_id != action.payload.assignment_id);

      return [...rest, ...action.payload.projects].sort((a:Project, b:Project) => a.id - b.id);

    case ProjectActions.LOAD_PROJECT_SUCCESS:
      let remaining = state.filter((p: Project) => p.id != action.payload.id);
      return [...remaining, action.payload].sort((a:Project, b:Project) => a.id - b.id);

    case ProjectActions.CREATE_PROJECT_SUCCESS:
      return[...state, action.payload].sort((a:Project, b:Project) => a.id - b.id);

    case ProjectActions.DELETE_PROJECT_SUCCESS:
      return state.filter((p:Project) => p.id != action.payload);

    case UserActions.USER_LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
