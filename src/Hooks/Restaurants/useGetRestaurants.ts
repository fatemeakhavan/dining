import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import { IRestaurant } from '../../Interfaces/Restaurant.interface';
import DiningPanelQuery from "../../Helpers/DiningPanelQuery";

export default function useGetRestaurants() {
  return useQuery(
    `restaurant`,
    async () => {
      let restaurantsResult: IAdminPanelResult<IRestaurant[]>;
      let restaurants: IRestaurant[] = [];
      [restaurantsResult] = await getRestaurants();
      if (restaurantsResult) {
        restaurants = restaurantsResult.result;
      }
      return restaurants;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getRestaurants = (): Promise<[IAdminPanelResult<IRestaurant[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const restaurantsResult = await DiningPanelQuery<IRestaurant[]>({
        url: `restaurant`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([restaurantsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
