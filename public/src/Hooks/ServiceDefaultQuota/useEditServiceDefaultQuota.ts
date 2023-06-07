import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceQuota } from '../../Interfaces/ServiceQuota.interface';

export default function useEditServiceDefaultQuota() {
  const key = 'service-default-quota';
  return useMutation(
    async (values: {
      name: string;
      displayName: string;
      description: string;
      maxCpu: number;
      maxMemory: number;
      maxDisk: number;
      callBack?: () => void;
    }) => {
      const { name, displayName, description, maxCpu, maxMemory, maxDisk } = values;
      return await AdminPanelQuery<IServiceQuota>({
        url: `/service/quota/default`,
        method: ERequest.PUT,
        data: { name, displayName, description, maxCpu, maxMemory, maxDisk },
      });
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
