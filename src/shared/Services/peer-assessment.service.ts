import { Injectable } from '@angular/core';
import { CustomHttp } from './customHttp';
import { IAppState } from '../Store/Reducers/index';
import { Store } from '@ngrx/store';
import { PeerAssessmentActions } from '../Store/Actions/peer-assessment.actions';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../Constants/settings';
import { PeerAssessment } from '../Store/Models/peer-assessment';

@Injectable()
export class PeerAssessmentService {

  constructor(private chttp: CustomHttp, private store: Store<IAppState>) {

  }

  public getAllActive(): void {
    this.store.dispatch(PeerAssessmentActions.getAllActive());
  }

  public getAllActive$(): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/pa_forms`)
      .map(res => res.json())
      .map(json => json.pa_forms)
      .do(forms => this.store.dispatch(PeerAssessmentActions.getAllActiveSuccess(forms)))
      .catch(err => {
        this.store.dispatch(PeerAssessmentActions.getAllActiveFail(err));
        return Observable.throw(err);
      })
  }

  public getQuestionTypes(): void {
    this.store.dispatch(PeerAssessmentActions.getQuestionTypes());
  }

  public getQuestionTypes$() {
    return this.chttp.get(`${BASE_URL}/question_types`)
      .map(res => res.json())
      .map(json => json.question_types)
      .do(types => this.store.dispatch(PeerAssessmentActions.getQuestionTypesSuccess(types)))
      .catch(err => {
        this.store.dispatch(PeerAssessmentActions.getQuestionTypesFail(err));
        return Observable.throw(err);
      })
  }

  public createPeerAssessments(peer_assessments: PeerAssessment[]): void {
    let data = {
      "peer_assessments": peer_assessments
    };

    this.store.dispatch(PeerAssessmentActions.createPeerAssessments(data));
  }

  public createPeerAssessments$(peer_assessments: PeerAssessment[]): Observable<Response> {
    let data = {
      "peer_assessments": peer_assessments
    };

    let json = JSON.stringify(data);

    return this.chttp.post(`${BASE_URL}/peer_assessments`, json)
      .map(res => res.json())
      .map(json => json.points)
      .do(points => this.store.dispatch(PeerAssessmentActions.createPeerAssessmentsSuccess(points)))
      .catch(err => {
        this.store.dispatch(PeerAssessmentActions.createPeerAssessmentsFail(err));

        return Observable.throw(err);
      })
  }

}
