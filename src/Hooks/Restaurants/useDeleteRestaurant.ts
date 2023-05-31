import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IRestaurant } from '../../Interfaces/Restaurant.interface';

export default function useDeleteRestaurant() {
  const key = 'restaurant';
  return useMutation(
    async (values: { restaurantId: number; callBack?: () => void }) => {
      const { restaurantId } = values;
      const result = await DiningPanelQuery<IRestaurant>({
        url: `restaurant/${restaurantId}`,
        method: ERequest.DELETE,
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        // let users = queryClient.getQueryData<IUserGroup[]>(key);
        // if (users?.length) {
        //   queryClient.setQueryData(
        //     key,
        //     users.filter((user) => user.preferred_username !== values.username),
        //   );
        // }
        toast.success(`رستوران با موفقیت حذف گردید.`);
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
