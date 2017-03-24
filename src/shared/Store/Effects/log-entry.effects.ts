import { Actions, Effect } from '@ngrx/effects';
import { LogEntryActions } from '../Actions/log-entry.actions';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL } from '../../Constants/settings';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class LogEntryEffects{

  constructor(private actions: Actions, private chttp: CustomHttp, private toastrService: ToastrService) {
  }

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
    .switchMap(action => {
      let json = JSON.stringify(action.payload.entry);
      return this.chttp.post(`${BASE_URL}/projects/${action.payload.id}/logs`, json)
        .map(res => res.json())
        .map(json => json.log_entry)
        .switchMap(log_entry => Observable.of(LogEntryActions.createSuccess(log_entry)))
        .catch(err => Observable.of(LogEntryActions.createFail(err)));
    });

  @Effect({ dispatch: false }) entryCreated = this.actions
    .ofType(LogEntryActions.CREATE_LOG_ENTRY_SUCCESS)
    .do(_ => {
      let config: ToastConfig = {
        extendedTimeOut: 0,
        closeButton: true,
        tapToDismiss: true,
        timeOut: 1500,
        positionClass: 'toast-top-right'
      };

      this.toastrService.success('I successfully created your log entry!', 'Success', config);
    });

  @Effect({ dispatch: false }) entryCreateFailed = this.actions
    .ofType(LogEntryActions.CREATE_LOG_ENTRY_FAIL)
    .do(_ => {
      let config: ToastConfig = {
        extendedTimeOut: 0,
        closeButton: true,
        tapToDismiss: true,
        timeOut: 1500,
        positionClass: 'toast-top-right'
      };

      this.toastrService.error('I could not create your log entry!', 'Oops', config);
    });
}
