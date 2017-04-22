import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PeerAssessmentActions } from '../Actions/peer-assessment.actions';
import { CustomHttp } from '../../Services/customHttp';
import { IAppState } from '../Reducers/index';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';
import { UserActions } from '../Actions/user.actions';
import { UserType } from '../Models/user';

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

  @Effect() autoLoadForms = this.actions
    .ofType(UserActions.USER_LOGIN_SUCCESS)
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

  @Effect() createPeerAssessments = this.actions
    .ofType(PeerAssessmentActions.CREATE_PEER_ASSESSMENTS)
    .map(action => action.payload)
    .do(console.log)
    .map(payload => JSON.stringify(payload))
    .do(console.log)
    .switchMap(json => this.chttp.post(`${BASE_URL}/peer_assessments`, json)
      .map(res => res.json())
      .map(json => json.points)
      .switchMap(points => Observable.of(PeerAssessmentActions.createPeerAssessmentsSuccess(points)))
      .catch(err => Observable.of(PeerAssessmentActions.createPeerAssessmentsFail(err)))
    );

  @Effect({ dispatch: false }) createAssessmentsSuccessToast = this.actions
    .ofType(PeerAssessmentActions.CREATE_PEER_ASSESSMENTS_SUCCESS)
    .map(action => action.payload)
    .map(payload => JSON.parse(payload))
    .map(points => points.points_earned)
    .do(points => {
      this.toastrService.success(`Well done! You earned ${points} for your team`, 'Peer Assessments submited!');
    })
}
