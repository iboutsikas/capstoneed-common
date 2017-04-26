import * as moment from 'moment';

export class TimeHelpers {
  public static getTimeSpanInDays(start_date: string, end_date: string, start_offset: number = 0,  end_offset: number = 0): number {
    if(!start_date || !end_date) return 0;

    let start = moment(start_date).hour(start_offset).minutes(0).second(0);
    let end = moment(end_date).hour(end_offset).minutes(0).second(0);


    // return Math.abs(end.diff(start, 'days'))+1;
    return end.diff(start, 'days') + 1;
  }

  public static daysToMilliseconds(days: number) {
    if(days < 1) return 0;

    return days * 86400;
  }
}
