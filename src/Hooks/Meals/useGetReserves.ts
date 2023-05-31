import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IDateResult } from '../../Interfaces/DateResult.interface';
import { IReserveResult } from '../../Interfaces/ReserveResult.interface';

export default function (weekCount: number, mealType?: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER') {
  return useQuery(
    `reserve`,
    async () => {
      let reservesResult: IAdminPanelResult<IReserveResult>;
      let reserves: IDateResult = {
        dates: [],
        weekCount: 0,
        disabled: false,
        mealType: 'LUNCH',
      };
      if (mealType) reserves.mealType = mealType;
      [reservesResult] = await getReserves(weekCount, mealType);
      if (reservesResult) {
        reserves = reservesResult.result;
      }
      return reserves;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    },
  );
}

const getReserves = (
  weekCount: number,
  mealType?: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER',
): Promise<[IAdminPanelResult<IReserveResult>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const reservesResult = await DiningPanelQuery<IReserveResult>({
        url: `meal/reserve`,
        method: ERequest.GET,
        params: {
          size: '1000',
          weekCount: weekCount,
          mealType: mealType,
        },
      });
      resolve([reservesResult]);
    } catch (error) {
      reject(error);
    }
  });
};
