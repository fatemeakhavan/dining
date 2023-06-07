import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import { IServiceResourcePlan } from '../../Interfaces/ServiceResourcePlan.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';

export default function useDeleteLocation() {
  const key = 'location';
  return useMutation(
    async (values: { locationId: number; callBack?: () => void }) => {
      const { locationId } = values;
      const result = await DiningPanelQuery<IServiceResourcePlan>({
        url: `location/${locationId}`,
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
        toast.success(`شعبه با موفقیت حذف گردید.`);
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
