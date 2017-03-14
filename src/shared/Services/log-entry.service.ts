import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { LogEntryActions } from '../Store/Actions/log-entry.actions';
import { LogEntry } from '../Store/Models/log-entry';

@Injectable()
export class LogEntryService {
  constructor(private store: Store<IAppState>){}

  public getAll(project_id: number): void {
    this.store.dispatch(LogEntryActions.getAll(project_id))
  }

  public create(log: LogEntry, project_id: number): void {
    this.store.dispatch(LogEntryActions.create(log, project_id));
  }
}
