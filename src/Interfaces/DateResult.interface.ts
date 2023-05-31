import { IDate } from './Date.interface';

export interface IDateResult {
  dates: IDate[];
  weekCount: number;
  disabled: boolean;
  mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
}
