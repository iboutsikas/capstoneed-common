import { Action } from '@ngrx/store';
import { PeerAssessmentForm } from '../Models/peer-assessment-form';
import { QuestionType } from '../Models/question-type';
import { Question } from '../Models/question';

export class PeerAssessmentActions {
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS';
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS';
  public static readonly GET_ALL_ACTIVE_PEER_ASSESSMENTS_FAIL = 'GET_ALL_ACTIVE_PEER_ASSESSMENTS_FAIL';
  public static readonly GET_PEER_ASSESSMENT_FORM = 'GET_PEER_ASSESSMENT_FORM';
  public static readonly GET_PEER_ASSESSMENT_FORM_SUCCESS = 'GET_PEER_ASSESSMENT_FORM_SUCCESS';
  public static readonly GET_PEER_ASSESSMENT_FORM_FAIL = 'GET_PEER_ASSESSMENT_FORM_FAIL';
  public static readonly GET_QUESTION_TYPES = 'GET_QUESTION_TYPES';
  public static readonly GET_QUESTION_TYPES_SUCCESS = 'GET_QUESTION_TYPES_SUCCESS';
  public static readonly GET_QUESTION_TYPES_FAIL = 'GET_QUESTION_TYPES_FAIL';
  public static readonly GET_QUESTIONS = 'GET_QUESTIONS';
  public static readonly GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
  public static readonly GET_QUESTIONS_FAIL = 'GET_QUESTIONS_FAIL';
  public static readonly CREATE_PEER_ASSESSMENTS = 'CREATE_PEER_ASSESSMENTS';
  public static readonly CREATE_PEER_ASSESSMENTS_SUCCESS = 'CREATE_PEER_ASSESSMENTS_SUCCESS';
  public static readonly CREATE_PEER_ASSESSMENTS_FAIL = 'CREATE_PEER_ASSESSMENTS_FAIL';
  public static readonly CREATE_PEER_ASSESSMENT_FORM = 'CREATE_PEER_ASSESSMENT_FORM';
  public static readonly CREATE_PEER_ASSESSMENT_FORM_SUCCESS = 'CREATE_PEER_ASSESSMENT_FORM_SUCCESS';
  public static readonly CREATE_PEER_ASSESSMENT_FORM_FAIL = 'CREATE_PEER_ASSESSMENT_FORM_FAIL';


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

  public static getForm(form_id: number): Action {
    return {
      type: PeerAssessmentActions.GET_PEER_ASSESSMENT_FORM,
      payload: form_id
    }
  }

  public static getFormSuccess(new_form: PeerAssessmentForm): Action {
    return {
      type: PeerAssessmentActions.GET_PEER_ASSESSMENT_FORM_SUCCESS,
      payload: new_form
    }
  }

  public static getFormFail(err: any): Action {
    return {
      type: PeerAssessmentActions.GET_PEER_ASSESSMENT_FORM_FAIL,
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
      type: PeerAssessmentActions.GET_QUESTION_TYPES_SUCCESS,
      payload: types
    }
  }

  public static getQuestionTypesFail(err: any): Action {
    return {
      type: PeerAssessmentActions.GET_QUESTION_TYPES_FAIL,
      payload: err
    }
  }

  public static getQuestions(): Action {
    return {
      type: PeerAssessmentActions.GET_QUESTIONS
    }
  }

  public static getQuestionsSuccess(types: Question[]): Action {
    return {
      type: PeerAssessmentActions.GET_QUESTIONS_SUCCESS,
      payload: types
    }
  }

  public static getQuestionsFail(err: any): Action {
    return {
      type: PeerAssessmentActions.GET_QUESTIONS_FAIL,
      payload: err
    }
  }

  public static createPeerAssessments(data: any): Action {
    return {
      type: PeerAssessmentActions.CREATE_PEER_ASSESSMENTS,
      payload: data
    }
  }

  public static createPeerAssessmentsSuccess(points: any): Action {
    return {
      type: PeerAssessmentActions.CREATE_PEER_ASSESSMENTS_SUCCESS,
      payload: points
    }
  }

  public static createPeerAssessmentsFail(err: any): Action {
    return {
      type: PeerAssessmentActions.CREATE_PEER_ASSESSMENTS_FAIL,
      payload: err
    }
  }

  public static createPeerAssessmentForm(form_data): Action {
    return {
      type: PeerAssessmentActions.CREATE_PEER_ASSESSMENT_FORM,
      payload: form_data
    }
  }

  public static createPeerAssessmentFormSuccess(): Action {
    return {
      type: PeerAssessmentActions.CREATE_PEER_ASSESSMENT_FORM_SUCCESS
    }
  }

  public static createPeerAssessmentFormFail(err: any): Action {
    return {
      type: PeerAssessmentActions.CREATE_PEER_ASSESSMENT_FORM_FAIL,
      payload: err
    }
  }

}
