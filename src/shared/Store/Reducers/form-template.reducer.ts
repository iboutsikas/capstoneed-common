import { Action, ActionReducer } from '@ngrx/store';
import { FormTemplate } from '../Models/form-template';
import { UserActions } from '../Actions/user.actions';
import { FormTemplateActions } from '../Actions/form-template.actions';

const INITIAL_STATE = [];
export const formTemplateReducer:ActionReducer<FormTemplate[]> = (state: FormTemplate[] = INITIAL_STATE, action: Action) => {

  switch(action.type) {
    case FormTemplateActions.CREATE_FORM_TEMPLATE_SUCCESS: {
      return sort([...state, action.payload]);
    }

    case FormTemplateActions.GET_FORM_TEMPLATES_SUCCESS: {
      return sort([...action.payload]);
    }

    case FormTemplateActions.GET_FORM_TEMPLATE_SUCCESS: {
      let remaining = state.filter(tmp => tmp.id != action.payload.id);
      return sort([...remaining, action.payload]);
    }

    case UserActions.USER_LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default: return state;
  }
};

const sort = (state: FormTemplate[]) => state.sort( (a: FormTemplate, b: FormTemplate) => b.id - a.id);
