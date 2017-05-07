import { Assignment } from '../Store/Models/assignment';

import * as moment from 'moment';
import { Iteration } from '../Store/Models/iteration';
import { IterationHelpers } from './iteration.helpers';

export class ProjectHelpers {
  public static timePassedPercentage(assignment: Assignment, now?: any): number {
    if(!assignment) {
      return 0;
    }
    now = now || Date.now();
    let end: any = moment(assignment.end_date, 'YYYY-MM-DD').toDate();
    let start: any = moment(assignment.start_date, 'YYYY-MM-DD').toDate();
    return Math.round((now - start) / (end - start) * 100);
  }

  public static getNumberOfIterationsCompleted(iterations: Iteration[], now?: any): number {
    if(!iterations) {
      return 0;
    }
    now = now || Date.now();
    let accumulator = 0;
    for(let i = 0; i < iterations.length; i++) {
      // let it = iterations[i];
      if(IterationHelpers.isIterationActive(iterations[i])) {
        accumulator++;
      }
    }
    return accumulator;
  }
}
