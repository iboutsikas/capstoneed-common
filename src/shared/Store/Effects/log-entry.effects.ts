import { Actions, Effect } from '@ngrx/effects';
import { LogEntryActions } from '../Actions/log-entry.actions';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LogEntryEffects{

  constructor(private actions: Actions, private chttp: CustomHttp) {}

  @Effect() getEntries = this.actions
    .ofType(LogEntryActions.GET_ALL_LOG_ENTRIES)
    .map(action => action.payload)
    .switchMap(project_id => this.chttp.get(`${BASE_URL}/projects/${project_id}/logs`)
      .map(res => res.json())
      .map(json => json.logs)
      .switchMap(entries => Observable.of(LogEntryActions.getAllSuccess(entries)))
      .catch(err => Observable.of(LogEntryActions.getAllFail(err)))
    );
}
