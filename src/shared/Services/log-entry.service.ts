import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { LogEntryActions } from '../Store/Actions/log-entry.actions';
import { LogEntry } from '../Store/Models/log-entry';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { CustomHttp } from './customHttp';
import { BASE_URL } from '../Constants/settings';
import { UserActions } from '../Store/Actions/user.actions';
import { ToastrConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class LogEntryService {

  constructor(private store: Store<IAppState>, private chttp: CustomHttp, private toastrService: ToastrService){
  }

  public getAll(project_id: number): void {
    this.store.dispatch(LogEntryActions.getAll(project_id));
  }

  public getAll$(project_id: number): Observable<Response> {
    return this.chttp.get(`${BASE_URL}/projects/${project_id}/logs`)
      .map(res => res.json())
      .map(json => json.logs)
      .do(entries => this.store.dispatch(LogEntryActions.getAllSuccess(entries)))
      .catch(err => {
        this.store.dispatch(LogEntryActions.getAllFail(err));
        return Observable.throw(err);
      })
  }

  public create(log: LogEntry, project_id: number): void {
    this.store.dispatch(LogEntryActions.create(log, project_id));
  }

  public create$(log: LogEntry, project_id: number): Observable<Response> {
    let json = JSON.stringify(log);

    return this.chttp.post(`${BASE_URL}/projects/${project_id}/logs`, json)
      .map(res => res.json())
      .do(json => {
        let config: ToastrConfig = {
          autoDismiss: false,
          timeOut: 0
        };

        let points = json.points.points_earned || 0;
        let exp = json.xp.xp_earned || 0;

        this.toastrService.success(`You earned ${points} points for your team, and got ${exp}XP`, 'Success', config);
        this.store.dispatch(UserActions.userGainedXP(json.xp));
        this.store.dispatch(LogEntryActions.createSuccess(json.log_entry))
      })
      .catch(err => {
        this.store.dispatch(LogEntryActions.createFail(err));
        return Observable.throw(err);
      })
  }

}
