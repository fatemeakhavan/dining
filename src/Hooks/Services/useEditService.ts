import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IService } from '../../Interfaces/Service.interface';

export default function useEditService() {
  const key = 'service';
  return useMutation(
    async (values: {
      serviceId: number;
      name: string;
      faDisplayName: string;
      faDescription: string;
      maintenanceMode: boolean;
      type: 'MANAGED' | 'UNMANAGED' | 'SHARED';
      validNodeCounts: number[];
      clusterMode: boolean;
      callBack?: () => void;
    }) => {
      const { serviceId, name, faDisplayName, faDescription, maintenanceMode, type, validNodeCounts, clusterMode } = values;
      const result = await AdminPanelQuery<IService>({
        url: `service/${serviceId}`,
        method: ERequest.PUT,
        data: { name, faDisplayName, faDescription, maintenanceMode, type, validNodeCounts, clusterMode },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`سرویس با موفقیت به روز رسانی گردید.`);
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
