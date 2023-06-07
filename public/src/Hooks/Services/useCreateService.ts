import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IService } from '../../Interfaces/Service.interface';

export default function useCreateService() {
  const key = 'service';
  return useMutation(
    async (values: {
      name: string;
      faDisplayName: string;
      faDescription: string;
      maintenanceMode: boolean;
      type: 'MANAGED' | 'UNMANAGED' | 'SHARED';
      groupId: number;
      validNodeCounts: number[];
      clusterMode: boolean;
      callBack?: () => void;
    }) => {
      const { name, faDisplayName, faDescription, maintenanceMode, type, groupId, validNodeCounts, clusterMode } = values;
      const result = await AdminPanelQuery<IService>({
        url: `/service`,
        method: ERequest.POST,
        data: { name, faDisplayName, faDescription, maintenanceMode, type, groupId, validNodeCounts, clusterMode },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`سرویس جدید با موفقیت اضافه گردید.`);
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
