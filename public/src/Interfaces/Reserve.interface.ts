import { IFood } from './Food';
import { IBeverage } from './Beverage.interface';
import { ILocation } from './Location.interface';
import { IRestaurant } from './Restaurant.interface';

export interface IReserve {
  id: number;
  created: string;
  food: IFood;
  beverage: IBeverage;
  location: ILocation;
  restaurant: IRestaurant;
  dateId: number;
}
