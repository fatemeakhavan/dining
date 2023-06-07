import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IFood } from '../../Interfaces/Food';

export default function useCreateFood() {
  const key = 'food';
  return useMutation(
    async (values: { name: string; pictureUrl: string; callBack?: () => void }) => {
      const { name, pictureUrl } = values;
      return await DiningPanelQuery<IFood>({
        url: `/food`,
        method: ERequest.POST,
        data: { name, pictureUrl },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`غذای جدید با موفقیت اضافه گردید.`);
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
