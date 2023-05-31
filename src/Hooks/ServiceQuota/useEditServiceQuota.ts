import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IService } from '../../Interfaces/Service.interface';

export default function useEditServiceQuota() {
  const key = 'service';
  return useMutation(
    async (values: {
      serviceId: number;
      name: string;
      displayName: string;
      description: string;
      maxCpu: number;
      maxMemory: number;
      maxDisk: number;
      callBack?: () => void;
    }) => {
      const { serviceId, name, displayName, description, maxCpu, maxMemory, maxDisk } = values;
      const result = await AdminPanelQuery<IService>({
        url: `service/${serviceId}/quota`,
        method: ERequest.PUT,
        data: { name, displayName, description, maxCpu, maxMemory, maxDisk },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`سهمیه سرویس با موفقیت به روز رسانی گردید.`);
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
