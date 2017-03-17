import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../Store/Reducers/index';
import { LogEntryActions } from '../Store/Actions/log-entry.actions';
import { LogEntry } from '../Store/Models/log-entry';
import { Subject, Observable } from 'rxjs';
import { LogEntryEffects } from '../Store/Effects/log-entry.effects';

@Injectable()
export class LogEntryService {

  private _errors: Subject<any>;

  public get errors(): Observable<any> {
    return this._errors.asObservable();
  }

  constructor(private store: Store<IAppState>, private logEffects: LogEntryEffects){
    this._errors = new Subject<any>();
  }

  public getAll(project_id: number): void {
    this.store.dispatch(LogEntryActions.getAll(project_id))
  }

  public create(log: LogEntry, project_id: number): void {
    this.store.dispatch(LogEntryActions.create(log, project_id));
  }

  public addError(err: any): void {
    this._errors.next(err);
  }

}
