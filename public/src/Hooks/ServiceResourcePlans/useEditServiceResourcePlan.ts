import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceResourcePlan } from '../../Interfaces/ServiceResourcePlan.interface';

export default function useEditServiceResourcePlan() {
  const key = 'service-resource-plan';
  return useMutation(
    async (values: {
      serviceId: number;
      planId: number;
      name: string;
      faDisplayName: string;
      faDescription?: string;
      cpu: number;
      memory: number;
      mainDisk: {
        capacity: number;
        iops: number;
        type: 'GP' | 'SP';
      };
      templateName: 'WIN2016' | 'WIN2019' | 'CENTOS7' | 'UBUNTU1804' | 'ORACLE';
      extraDisks: {
        capacity: number;
        iops: number;
        mountPath: string;
      }[];
      callBack?: () => void;
    }) => {
      const { serviceId, planId, name, faDisplayName, faDescription, cpu, memory, mainDisk, templateName, extraDisks } = values;
      const result = await AdminPanelQuery<IServiceResourcePlan>({
        url: `service/${serviceId}/resource/plan/${planId}`,
        method: ERequest.PUT,
        data: { name, faDisplayName, faDescription, cpu, memory, mainDisk, templateName, extraDisks },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`پلن منابع سرویس با موفقیت به روز رسانی گردید.`);
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
