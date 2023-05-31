import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IFood } from '../../Interfaces/Food';

export default function useGetFoods() {
  return useQuery(
    `food`,
    async () => {
      let foodsResult: IAdminPanelResult<IFood[]>;
      let foods: IFood[] = [];
      [foodsResult] = await getFoods();
      if (foodsResult) {
        foods = foodsResult.result;
      }
      return foods;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getFoods = (): Promise<[IAdminPanelResult<IFood[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const foodsResult = await DiningPanelQuery<IFood[]>({
        url: `food`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([foodsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
