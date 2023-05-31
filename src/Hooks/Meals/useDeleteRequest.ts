import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IMealReserve } from '../../Interfaces/MealReserve.interface';

export default function useDeleteRequest() {
  const key = 'reserve';
  return useMutation(
    async (values: { dateId: number; callBack?: () => void }) => {
      const { dateId } = values;
      return await DiningPanelQuery<any>({
        url: `meal/request-reserve/day/${dateId}`,
        method: ERequest.DELETE,
      });
    },
    {
      onMutate: () => {},
      onSuccess: (result, values) => {
        toast.success(`درخواست حذف با موفقیت ثبت شد.`);
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
