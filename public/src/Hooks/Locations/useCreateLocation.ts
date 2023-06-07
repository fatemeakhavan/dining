import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import { IRestaurant } from '../../Interfaces/Restaurant.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';

export default function useCreateLocation() {
  const key = 'location';
  return useMutation(
    async (values: { name: string; address: string; callBack?: () => void }) => {
      const { address, name } = values;
      return await DiningPanelQuery<IRestaurant>({
        url: `/location`,
        method: ERequest.POST,
        data: { name, address },
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
