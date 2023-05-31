import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IService } from '../../Interfaces/Service.interface';

export default function useDeleteService() {
  const key = 'service';
  return useMutation(
    async (values: { serviceId: number; callBack?: () => void }) => {
      const { serviceId } = values;
      const result = await AdminPanelQuery<IService>({
        url: `service/${serviceId}`,
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
        toast.success(`سرویس با موفقیت حذف گردید.`);
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
