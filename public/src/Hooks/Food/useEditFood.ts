import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IFood } from '../../Interfaces/Food';

export default function useEditFood() {
  const key = 'food';
  return useMutation(
    async (values: { name: string; foodId: number; pictureUrl: string; callBack?: () => void }) => {
      const { name, foodId, pictureUrl } = values;
      return await DiningPanelQuery<IFood>({
        url: `/food/${foodId}`,
        method: ERequest.PUT,
        data: { name, pictureUrl },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`نام غذا با موفقیت ویرایش شد.`);
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
