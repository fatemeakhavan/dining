import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IRestaurant } from '../../Interfaces/Restaurant.interface';

export default function useEditRestaurant() {
  const key = 'restaurant';
  return useMutation(
    async (values: { name: string; restaurantId: number; logo: string; address: string; callBack?: () => void }) => {
      const { name, restaurantId, logo, address } = values;
      return await DiningPanelQuery<IRestaurant>({
        url: `/restaurant/${restaurantId}`,
        method: ERequest.PUT,
        data: { name, logo, address },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(` با موفقیت ویرایش شد.`);
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
