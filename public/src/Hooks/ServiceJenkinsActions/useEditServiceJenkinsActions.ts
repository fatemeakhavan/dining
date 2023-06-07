import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceJenkinsAction } from '../../Interfaces/ServiceJenkinsAction.interface';
import { IServiceJenkinsInput } from '../../Interfaces/ServiceJenkinsInput.interface';
import { IServiceJenkinsOutput } from '../../Interfaces/ServiceJenkinsOutput.interface';

export default function useEditServiceJenkinsActions() {
  const key = 'service-jenkins-action';
  return useMutation(
    async (values: {
      serviceId: number;
      actionId: number;
      name: string;
      faDisplayName: string;
      faDescription?: string;
      actionType: string;
      jobName: string;
      jenkinsInput: IServiceJenkinsInput[];
      jenkinsOutput: IServiceJenkinsOutput[];
      callBack?: () => void;
    }) => {
      const { serviceId, actionId, name, faDisplayName, faDescription, actionType, jobName, jenkinsInput, jenkinsOutput } = values;
      const result = await AdminPanelQuery<IServiceJenkinsAction>({
        url: `service/${serviceId}/jenkins/action/${actionId}`,
        method: ERequest.PUT,
        data: { name, faDisplayName, faDescription, actionType, jobName, jenkinsInput, jenkinsOutput },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`اکشن های جنکینز سرویس با موفقیت به روز رسانی گردید.`);
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
