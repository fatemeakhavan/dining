import { IFood } from './Food';
import { IBeverage } from './Beverage.interface';
import { ILocation } from './Location.interface';

export interface IMeal {
  dateId: number;
  foods?: IFood[];
  mealType: string;
  foodIds: number[];
  beverageIds: number[];
  locationIds: number[];
  restaurantIds: number[];
  beverages?: IBeverage[];
  locations?: ILocation[];
}
