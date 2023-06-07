import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IBeverage } from '../../Interfaces/Beverage.interface';

export default function useGetBeverages() {
  return useQuery(
    `beverage`,
    async () => {
      let beveragesResult: IAdminPanelResult<IBeverage[]>;
      let beverages: IBeverage[] = [];
      [beveragesResult] = await getBeverages();
      if (beveragesResult) {
        beverages = beveragesResult.result;
      }
      return beverages;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getBeverages = (): Promise<[IAdminPanelResult<IBeverage[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const beveragesResult = await DiningPanelQuery<IBeverage[]>({
        url: `beverage`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([beveragesResult]);
    } catch (error) {
      reject(error);
    }
  });
};
