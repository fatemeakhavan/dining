import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IReserveRequest } from '../../Interfaces/IReserveRequest';

export default function (dateId: number) {
  return useQuery(
    `request_reserve${dateId}`,
    async () => {
      let requestsResult: IAdminPanelResult<IReserveRequest[]>;
      [requestsResult] = await getRequests(dateId);

      return requestsResult;
    },
    {
      enabled: true,
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    },
  );
}

const getRequests = (dateId: number): Promise<[IAdminPanelResult<IReserveRequest[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const requestsResults = await DiningPanelQuery<IReserveRequest[]>({
        url: `meal/request-reserve/report`,
        method: ERequest.GET,
        params: {
          dateId: dateId,
        },
      });
      resolve([requestsResults]);
    } catch (error) {
      reject(error);
    }
  });
};
