import { Iteration } from '../Store/Models/iteration';
export class IterationHelpers {
  public static isIterationActive(iteration: Iteration, now?: any): boolean {
    if(!iteration)
      return false;
    now = now || new Date();
    return new Date(iteration.deadline) <= now;
  }

  public static getProgressPercent(iteration: Iteration, now?: any): number {
    if(iteration.start_date >= now) {
      return 0;
    }
    let end: any = new Date(iteration.deadline);
    let start: any = new Date(iteration.start_date);
    return Math.round((now - start) / (end -start) * 100);
  }


}
