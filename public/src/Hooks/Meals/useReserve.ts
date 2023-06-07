import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IMealReserve } from '../../Interfaces/MealReserve.interface';

export default function useReserve() {
  const key = 'reserve';
  return useMutation(
    async (values: { reserves: IMealReserve[]; callBack?: () => void }) => {
      const { reserves } = values;
      return await DiningPanelQuery<IMealReserve[]>({
        url: `/meal/reserve`,
        method: ERequest.PUT,
        data: { reserves: reserves },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`وعده های غذایی با موفقیت رزرو گردید.`);
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
