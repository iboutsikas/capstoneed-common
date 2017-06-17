import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PeerAssessmentActions } from '../Actions/peer-assessment.actions';
import { CustomHttp } from '../../Services/customHttp';
import { IAppState } from '../Reducers/index';
import { Store } from '@ngrx/store';
import { ToastrConfig, ToastrService } from 'ngx-toastr';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';
import { UserActions } from '../Actions/user.actions';
import { User, UserType } from '../Models/user';
import { IterationActions } from '../Actions/iteration.actions';

@Injectable()
export class PeerAssessmentEffects {


  constructor(private actions: Actions, private chttp: CustomHttp, private store: Store<IAppState>, private toastrService: ToastrService) { }

  @Effect() getActiveForms = this.actions
    .ofType(PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS)
    // .throttleTime(5000)
    .switchMap(action => this.chttp.get(`${BASE_URL}/pa_forms`)
      .map(res => res.json())
      .map(json => json.pa_forms)
      .switchMap(forms => Observable.of(PeerAssessmentActions.getAllActiveSuccess(forms)))
      .catch(err => Observable.of(PeerAssessmentActions.getAllActiveFail(err)))
    );

  @Effect() getForm = this.actions
    .ofType(PeerAssessmentActions.GET_PEER_ASSESSMENT_FORM)
    .map(action=> action.payload)
    .switchMap(form_id => this.chttp.get(`${BASE_URL}/pa_forms/${form_id}`)
      .map(res => res.json())
      .map(json => json.pa_form)
      .switchMap(pa_form => Observable.of(PeerAssessmentActions.getFormSuccess(pa_form)))
      .catch(err => Observable.of(PeerAssessmentActions.getFormFail(err)))
    );

  @Effect() autoLoadForms = this.actions
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .map(action => action.payload)
    .filter((user: User) => user.type === UserType.STUDENT)
    .throttleTime(450)
    .switchMap(_ => Observable.of(PeerAssessmentActions.getAllActive()));

  @Effect({ dispatch: false }) studentActiveAssessmentsToast = this.store.select((state: IAppState) => state.user)
    .filter(user => user != null)
    .filter(user => user.type == UserType.STUDENT)
    .switchMap(user => this.actions.ofType(PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS)
      .map(action => action.payload)
      .map(assessments => assessments.length)
      .do(asLen => {
        this.toastrService.info(`I found ${asLen} active assessments for you, ${user.first_name}`);
      })
    );

  @Effect() getQuestionTypes = this.actions
    .ofType(PeerAssessmentActions.GET_QUESTION_TYPES)
    .switchMap(action => this.chttp.get(`${BASE_URL}/question_types`)
      .map(res => res.json())
      .map(json => json.question_types)
      .switchMap(types => Observable.of(PeerAssessmentActions.getQuestionTypesSuccess(types)))
      .catch(err => Observable.of(PeerAssessmentActions.getQuestionTypesFail(err)))
    );

  @Effect() getQuestions = this.actions
    .ofType(PeerAssessmentActions.GET_QUESTIONS)
    .switchMap(action => this.chttp.get(`${BASE_URL}/questions`)
      .map(res => res.json())
      .map(json => json.questions)
      .switchMap(questions => Observable.of(PeerAssessmentActions.getQuestionsSuccess(questions)))
      .catch(err => Observable.of(PeerAssessmentActions.getQuestionsFail(err)))
    );

  @Effect() createPeerAssessments = this.actions
    .ofType(PeerAssessmentActions.CREATE_PEER_ASSESSMENTS)
    .map(action => action.payload)
    .map(payload => JSON.stringify(payload))
    .switchMap(json => this.chttp.post(`${BASE_URL}/peer_assessments`, json)
      .map(res => res.json())
      .map(json => json.points)
      .switchMap(points => Observable.of(PeerAssessmentActions.createPeerAssessmentsSuccess(points)))
      .catch(err => Observable.of(PeerAssessmentActions.createPeerAssessmentsFail(err)))
    );

  @Effect({ dispatch: false }) createAssessmentsSuccessToast = this.actions
    .ofType(PeerAssessmentActions.CREATE_PEER_ASSESSMENTS_SUCCESS)
    .map(action => action.payload)
    .map(payload => payload.points_earned)
    .do(points => {
      let config: ToastrConfig = {
        autoDismiss: false,
        timeOut: 0
      };

      this.toastrService.success(`Well done! You earned ${points} for your team`, 'Peer Assessments submited!', config);
    });

  @Effect() createPeerAssessmentForm = this.actions
    .ofType(PeerAssessmentActions.CREATE_PEER_ASSESSMENT_FORM)
    .map(action => action.payload)
    .switchMap(payload => {
      let json = JSON.stringify(payload);

      return this.chttp.post(`${BASE_URL}/assignments/${payload.assignment_id}/pa_forms`, json)
        .switchMap(res => Observable.of(PeerAssessmentActions.createPeerAssessmentFormSuccess()))
        .catch(err => Observable.of(PeerAssessmentActions.createPeerAssessmentFormFail(err)))
    });

  @Effect() getAllScored = this.actions
    .ofType(IterationActions.GET_ALL_SCORED)
    .switchMap(action => this.chttp.get(`${BASE_URL}/scored-iterations`)
      .map(res => res.json())
      .map(json => json.iterations || [])
      .switchMap(iterations => Observable.of(IterationActions.getAllScoredSuccess(iterations)))
      .catch(err => Observable.of(IterationActions.getAllScoredFail(err)))
    )
}
