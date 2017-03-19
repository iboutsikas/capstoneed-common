import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { LogEntryActions } from '../Store/Actions/log-entry.actions';
import { LogEntry } from '../Store/Models/log-entry';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { CustomHttp } from './customHttp';
import { BASE_URL } from '../Constants/settings';

@Injectable()
export class LogEntryService {

  constructor(private store: Store<IAppState>, private chttp: CustomHttp){
  }

  public getAll(project_id: number): Observable<Response> {

    //TODO: This probably does not need the id. Fix later?
    this.store.dispatch(LogEntryActions.getAll(project_id));

    return this.chttp.get(`${BASE_URL}/projects/${project_id}/logs`)
      .map(res => res.json())
      .map(json => json.logs)
      .do(entries => this.store.dispatch(LogEntryActions.getAllSuccess(entries)))
      .catch(err => {
        this.store.dispatch(LogEntryActions.getAllFail(err));
        return Observable.throw(err);
      })
  }

  public create(log: LogEntry, project_id: number): Observable<Response> {
    this.store.dispatch(LogEntryActions.create());

    let json = JSON.stringify(log);

    return this.chttp.post(`${BASE_URL}/projects/${project_id}/logs`, json)
      .map(res => res.json())
      .map(res_json => res_json.log_entry)
      .do(entry => this.store.dispatch(LogEntryActions.createSuccess(entry)))
      .catch(err => {
        this.store.dispatch(LogEntryActions.createFail(err));
        return Observable.throw(err);
      })
  }

}
