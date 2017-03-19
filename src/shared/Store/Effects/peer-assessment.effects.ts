import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PeerAssessmentActions } from '../Actions/peer-assessment.actions';
import { CustomHttp } from '../../Services/customHttp';
import { IAppState } from '../Reducers/index';
import { Store } from '@ngrx/store';
import { UserType } from '../Models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PeerAssessmentEffects {


  constructor(private actions: Actions, private chttp: CustomHttp, private store: Store<IAppState>, private toastrService: ToastrService) { }

  // @Effect() getActiveForms = this.actions
  //   .ofType(PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS)
  //   // .throttleTime(5000)
  //   .switchMap(action => this.chttp.get(`${BASE_URL}/pa_forms`)
  //     .map(res => res.json())
  //     .map(json => json.pa_forms)
  //     .switchMap(forms => Observable.of(PeerAssessmentActions.getAllActiveSuccess(forms)))
  //     .catch(err => Observable.of(PeerAssessmentActions.getAllActiveFail(err)))
  //   );

  @Effect({ dispatch: false }) studentActiveAssessmentsToast = this.store.select((state: IAppState) => state.user)
    .filter(user => user != null)
    .filter(user => user.type == UserType.STUDENT)
    .switchMap(user => this.actions.ofType(PeerAssessmentActions.GET_ALL_ACTIVE_PEER_ASSESSMENTS_SUCCESS)
      .map(action => action.payload)
      .map(assessments => assessments.length)
      .do(asLen => {
        this.toastrService.info(`I found ${asLen} active assessments for you, ${user.first_name}`);
      })
    )
}
