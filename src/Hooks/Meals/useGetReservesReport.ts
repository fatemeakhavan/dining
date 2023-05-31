import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IReserveResult } from '../../Interfaces/ReserveResult.interface';

export default function (weekCount: number, mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER') {
  return useQuery(
    `reserve`,
    async () => {
      let reservesResult: IAdminPanelResult<IReserveResult>;
      [reservesResult] = await getReserves(weekCount, mealType);

      return reservesResult;
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
  mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER',
): Promise<[IAdminPanelResult<IReserveResult>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const reservesResult = await DiningPanelQuery<IReserveResult>({
        url: `meal/reserve/report/excel`,
        method: ERequest.GET,
        params: {
          weekCount: weekCount,
          mealType: mealType,
        },
        responseType: 'blob',
      });
      resolve([reservesResult]);
    } catch (error) {
      reject(error);
    }
  });
};
