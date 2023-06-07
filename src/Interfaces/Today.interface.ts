import { IMeal } from './Meal.interface';

export interface IToday {
  date: string;
  dayName: string;
  holiday: true;
  id: 0;
  meal?: IMeal;
  monthName: string;
}
