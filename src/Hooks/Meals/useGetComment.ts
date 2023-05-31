import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IReserveComment } from '../../Interfaces/IReserveComment';

export default function (dateId: number) {
  return useQuery(
    `comment`,
    async () => {
      let commentResult: IAdminPanelResult<IReserveComment>;
      [commentResult] = await getComment(dateId);
      return commentResult;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    },
  );
}

const getComment = (dateId: number): Promise<[IAdminPanelResult<IReserveComment>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const commentsResult = await DiningPanelQuery<IReserveComment>({
        url: `meal/reserve/${dateId}/comment`,
        method: ERequest.GET,
      });
      resolve([commentsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
