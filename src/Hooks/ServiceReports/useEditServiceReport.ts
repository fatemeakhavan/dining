import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceReport } from '../../Interfaces/ServiceReport.interface';

export default function useEditServiceReport() {
  const key = 'service-report';
  return useMutation(
    async (values: {
      reportId: number;
      serviceId: number;
      name: string;
      faDisplayName: string;
      faDescription?: string;
      type: 'LIST' | 'RESOURCE_USAGE' | 'ACTIVITY';
      callBack?: () => void;
    }) => {
      const { serviceId, reportId, name, faDisplayName, faDescription, type } = values;
      const result = await AdminPanelQuery<IServiceReport>({
        url: `service/${serviceId}/report/${reportId}`,
        method: ERequest.PUT,
        data: { name, faDisplayName, faDescription, type },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`گزارش سرویس با موفقیت به روز رسانی گردید.`);
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
