import { Action } from '@ngrx/store';
import { FormTemplate } from '../Models/form-template';

export class FormTemplateActions {
  public static readonly CREATE_FORM_TEMPLATE = 'CREATE_FORM_TEMPLATE';
  public static readonly CREATE_FORM_TEMPLATE_SUCCESS = 'CREATE_FORM_TEMPLATE_SUCCESS';
  public static readonly CREATE_FORM_TEMPLATE_FAIL = 'CREATE_FORM_TEMPLATE_FAIL';
  public static readonly GET_FORM_TEMPLATES = 'GET_FORM_TEMPLATES';
  public static readonly GET_FORM_TEMPLATES_SUCCESS = 'GET_FORM_TEMPLATES_SUCCESS';
  public static readonly GET_FORM_TEMPLATES_FAIL = 'GET_FORM_TEMPLATES_FAIL';
  public static readonly GET_FORM_TEMPLATE = 'GET_FORM_TEMPLATE';
  public static readonly GET_FORM_TEMPLATE_SUCCESS = 'GET_FORM_TEMPLATE_SUCCESS';
  public static readonly GET_FORM_TEMPLATE_FAIL = 'GET_FORM_TEMPLATE_FAIL';

  public static create(form: FormTemplate): Action {
    return {
      type: FormTemplateActions.CREATE_FORM_TEMPLATE,
      payload: form
    }
  }

  public static createSuccess(form: FormTemplate): Action {
    return {
      type: FormTemplateActions.CREATE_FORM_TEMPLATE_SUCCESS,
      payload: form
    }
  }

  public static createFail(err: any): Action {
    return {
      type: FormTemplateActions.CREATE_FORM_TEMPLATE_FAIL,
      payload: err
    }
  }

  public static getAll(): Action {
    return {
      type: FormTemplateActions.GET_FORM_TEMPLATES
    }
  }

  public static getAllSuccess(forms: FormTemplate[]): Action {
    return {
      type: FormTemplateActions.GET_FORM_TEMPLATES_SUCCESS,
      payload: forms
    }
  }

  public static getAllFail(err: any): Action {
    return {
      type: FormTemplateActions.GET_FORM_TEMPLATES_FAIL,
      payload: err
    }
  }

  public static get(form_id: number): Action {
    return {
      type: FormTemplateActions.GET_FORM_TEMPLATE,
      payload: form_id
    }
  }

  public static getSuccess(form: FormTemplate): Action {
    return {
      type: FormTemplateActions.GET_FORM_TEMPLATE_SUCCESS,
      payload: form
    }
  }

  public static getFail(err: any): Action {
    return {
      type: FormTemplateActions.GET_FORM_TEMPLATE_FAIL,
      payload: err
    }
  }

}
