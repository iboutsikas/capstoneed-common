import { Injectable } from '@angular/core';
import { CustomHttp } from './customHttp';
import { IAppState } from '../Store/Reducers/index';
import { Store } from '@ngrx/store';
import { PeerAssessmentActions } from '../Store/Actions/peer-assessment.actions';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../Constants/settings';

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

}
