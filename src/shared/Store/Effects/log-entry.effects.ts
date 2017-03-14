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

  @Effect() createEntry = this.actions
    .ofType(LogEntryActions.CREATE_LOG_ENTRY)
    .do(console.log)
    .switchMap(action => {
      let json = JSON.stringify(action.payload.entry);
      return this.chttp.post(`${BASE_URL}/projects/${action.payload.id}/logs`, json)
        .map(res => res.json())
        .map(json => json.log_entry)
        .switchMap(log_entry => Observable.of(LogEntryActions.createSuccess(log_entry)))
        .catch(err => Observable.of(LogEntryActions.createFail(err)));
    })
}
