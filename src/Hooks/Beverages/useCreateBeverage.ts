import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IBeverage } from '../../Interfaces/Beverage.interface';

export default function useCreateBeverage() {
  const key = 'beverage';
  return useMutation(
    async (values: { name: string; callBack?: () => void }) => {
      const { name } = values;
      return await DiningPanelQuery<IBeverage>({
        url: `/beverage`,
        method: ERequest.POST,
        data: { name },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`نوشیدنی جدید با موفقیت اضافه گردید.`);
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
