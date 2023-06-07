import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IDate } from '../../Interfaces/Date.interface';
import { IDateResult } from '../../Interfaces/DateResult.interface';

export default function (weekCount: number, mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER') {
  return useQuery(
    `date`,
    async () => {
      let datesResult: IAdminPanelResult<IDateResult>;
      let dates: IDateResult = {
        dates: [],
        weekCount: 0,
        disabled: false,
        mealType: mealType,
      };
      [datesResult] = await getDates(weekCount, mealType);
      if (datesResult) {
        dates = datesResult.result;
      }
      return dates;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    },
  );
}

const getDates = (weekCount: number, mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER'): Promise<[IAdminPanelResult<IDateResult>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const datesResult = await DiningPanelQuery<IDateResult>({
        url: `date/week`,
        method: ERequest.GET,
        params: {
          size: '1000',
          weekCount: weekCount,
          mealType: mealType,
        },
      });
      resolve([datesResult]);
    } catch (error) {
      reject(error);
    }
  });
};
