import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IFoodComments } from '../../Interfaces/IFoodComments';

export default function (dateId: number, foodId: number) {
  return useQuery(
    `comments${dateId}${foodId}`,
    async () => {
      let commentsResult: IAdminPanelResult<IFoodComments>;
      [commentsResult] = await getComments(dateId, foodId);

      return commentsResult;
    },
    {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    },
  );
}

const getComments = (dateId: number, foodId: number): Promise<[IAdminPanelResult<IFoodComments>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const commentsResult = await DiningPanelQuery<IFoodComments>({
        url: `meal/reserve/admin/${dateId}/food/${foodId}/comment`,
        method: ERequest.GET,
      });
      resolve([commentsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
