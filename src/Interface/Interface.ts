export interface IRemedyCalendarDay {
  date: number;
  fullDate: Date;
  fullDateUTC: string;
  dateUTC: string;
  dayName: string;
  dayShort: string;
  isCurrentMonth: boolean;
  dayInitial: string;
  isToday: boolean;
  isWeekend: boolean;
  weekNumber: number;
  isoString: string;
  isoStringUTC: string;
}

export interface IRemedyCalendarWeek {
  id: number;
  beginDate: number;
  endDate: number;
  beginDateUTC: string;
  endDateUTC: string;
  beginDateUTConly: string;
  endDateUTConly: string;
  weekDay: IRemedyCalendarDay[];
}

export interface IRemedyCalendarMonth {
  monthIndex: number;
  monthName: string;
  monthYear: string;
  month: IRemedyCalendarWeek[];
}
