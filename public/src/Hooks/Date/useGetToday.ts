import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IToday } from '../../Interfaces/Today.interface';

export default function useGetToday() {
  return useQuery(
    `today`,
    async () => {
      let todayResult: IAdminPanelResult<IToday>;
      let today: IToday = { date: '', dayName: '', holiday: true, id: 0, meal: undefined, monthName: '' };
      [todayResult] = await getToday();
      if (todayResult) {
        today = todayResult.result;
      }
      return today;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getToday = (): Promise<[IAdminPanelResult<IToday>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const todayResult = await DiningPanelQuery<IToday>({
        url: `/date/today`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([todayResult]);
    } catch (error) {
      reject(error);
    }
  });
};
