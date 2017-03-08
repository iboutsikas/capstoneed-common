import { Injectable } from '@angular/core';
import { CustomHttp } from './customHttp';
import { IAppState } from '../Store/Reducers/index';
import { Store } from '@ngrx/store';
import { PeerAssessmentActions } from '../Store/Actions/peer-assessment.actions';

@Injectable()
export class PeerAssessmentService {

  constructor(private chttp: CustomHttp, private store: Store<IAppState>) {

  }

  getAllActive(): void {
    this.store.dispatch(PeerAssessmentActions.getAllActive());
  }

}
