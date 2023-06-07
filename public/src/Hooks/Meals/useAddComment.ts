import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IMealReserve } from '../../Interfaces/MealReserve.interface';
import { IReserveComment } from '../../Interfaces/IReserveComment';

export default function useAddComment(dateId: number) {
  const key = 'reserve' + dateId;
  return useMutation(
    async (values: { dateId: number; comment: IReserveComment; callBack?: () => void }) => {
      const { dateId, comment } = values;
      return await DiningPanelQuery<IMealReserve[]>({
        url: `meal/reserve/${dateId}/comment`,
        method: ERequest.PUT,
        data: comment,
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`نظر شما با موفقیت ثبت گردید.`);
        if (values.callBack) {
          values.callBack();
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
      onError: (error, values, rollback) => {
        console.error(error);
        //if (rollback) rollback();
      },
    },
  );
}
