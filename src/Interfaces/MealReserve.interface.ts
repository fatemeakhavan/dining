export interface IMealReserve {
  dateId: number;
  foodId?: number | null;
  beverageId?: number | null;
  locationId: number | null;
  restaurantId: number;
  mealType?: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
}
