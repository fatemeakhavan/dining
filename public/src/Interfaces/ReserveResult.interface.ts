import { IDate } from './Date.interface';

export interface IReserveResult {
  dates: IDate[];
  weekCount: number;
  disabled: boolean;
  mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
}
