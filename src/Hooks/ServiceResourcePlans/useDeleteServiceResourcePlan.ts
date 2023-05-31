import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceResourcePlan } from '../../Interfaces/ServiceResourcePlan.interface';

export default function useDeleteServiceResourcePlan() {
  const key = 'service-resource-plan';
  return useMutation(
    async (values: { serviceId: number; planId: number; callBack?: () => void }) => {
      const { serviceId, planId } = values;
      const result = await AdminPanelQuery<IServiceResourcePlan>({
        url: `service/${serviceId}/resource/plan/${planId}`,
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
        toast.success(`پلن منابع سرویس با موفقیت حذف گردید.`);
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
