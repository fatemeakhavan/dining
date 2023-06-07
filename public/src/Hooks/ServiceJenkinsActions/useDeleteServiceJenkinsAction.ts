import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceJenkinsAction } from '../../Interfaces/ServiceJenkinsAction.interface';

export default function useDeleteServiceJenkinsAction() {
  const key = 'service-jenkins-action';
  return useMutation(
    async (values: { serviceId: number; actionId: number; callBack?: () => void }) => {
      const { serviceId, actionId } = values;
      const result = await AdminPanelQuery<IServiceJenkinsAction>({
        url: `service/${serviceId}/jenkins/action/${actionId}`,
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
        toast.success(`اکشن جنکینز سرویس با موفقیت حذف گردید.`);
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
