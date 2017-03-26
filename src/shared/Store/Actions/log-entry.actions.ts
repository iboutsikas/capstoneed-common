import { Action } from '@ngrx/store';
import { LogEntry } from '../Models/log-entry';

export class LogEntryActions {
  public static readonly GET_ALL_LOG_ENTRIES = 'GET_ALL_LOG_ENTRIES';
  public static readonly GET_ALL_LOG_ENTRIES_SUCCESS = 'GET_ALL_LOG_ENTRIES_SUCCESS';
  public static readonly GET_ALL_LOG_ENTRIES_FAIL = 'GET_ALL_LOG_ENTRIES_FAIL';
  public static readonly CREATE_LOG_ENTRY = 'CREATE_LOG_ENTRY';
  public static readonly CREATE_LOG_ENTRY_SUCCESS = 'CREATE_LOG_ENTRY_SUCCESS';
  public static readonly CREATE_LOG_ENTRY_FAIL = 'CREATE_LOG_ENTRY_FAIL';

  public static getAll(project_id: number): Action {
    return {
      type: LogEntryActions.GET_ALL_LOG_ENTRIES,
      payload: project_id
    }
  }

  public static getAllSuccess(entries: LogEntry[]): Action {
    return {
      type: LogEntryActions.GET_ALL_LOG_ENTRIES_SUCCESS,
      payload: entries
    }
  }

  public static getAllFail(err: any): Action {
    return {
      type: LogEntryActions.GET_ALL_LOG_ENTRIES_FAIL,
      payload: err
    }
  }

  public static create(new_entry: LogEntry, project_id: number): Action {
    return {
      type: LogEntryActions.CREATE_LOG_ENTRY,
      payload: {
        entry: new_entry,
        id: project_id
      }
    }
  }

  public static createSuccess(log: LogEntry): Action {
    return {
      type: LogEntryActions.CREATE_LOG_ENTRY_SUCCESS,
      payload: log
    }
  }

  public static createFail(err: any): Action {
    return {
      type: LogEntryActions.CREATE_LOG_ENTRY_FAIL,
      payload: err
    }
  }
}
