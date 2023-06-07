import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IRestaurant } from '../../Interfaces/Restaurant.interface';

export default function useCreateRestaurant() {
  const key = 'restaurant';
  return useMutation(
    async (values: { name: string; logo: string; address: string; callBack?: () => void }) => {
      const { name, logo, address } = values;
      return await DiningPanelQuery<IRestaurant>({
        url: `/restaurant`,
        method: ERequest.POST,
        data: { name, logo, address },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`رستوران جدید با موفقیت اضافه گردید.`);
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
