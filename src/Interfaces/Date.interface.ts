import { IMeal } from './Meal.interface';
import { IReserve } from './Reserve.interface';

export interface IDate {
  id: number;
  date: string;
  dayName: string;
  monthName: string;
  holiday: boolean;
  disabled: boolean;
  meal: IMeal;
  request: any;
  reserve?: IReserve;
}
