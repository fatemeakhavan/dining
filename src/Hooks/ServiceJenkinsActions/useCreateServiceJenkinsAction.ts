import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceJenkinsInput } from '../../Interfaces/ServiceJenkinsInput.interface';
import { IServiceJenkinsOutput } from '../../Interfaces/ServiceJenkinsOutput.interface';
import { IServiceJenkinsAction } from '../../Interfaces/ServiceJenkinsAction.interface';

export default function useCreateServiceJenkinsAction() {
  const key = 'service-jenkins-action';
  return useMutation(
    async (values: {
      serviceId: number;
      name: string;
      faDisplayName: string;
      faDescription?: string;
      actionType: string;
      jobName: string;
      enable: boolean;
      jenkinsInput: IServiceJenkinsInput[];
      jenkinsOutput: IServiceJenkinsOutput[];
      callBack?: () => void;
    }) => {
      const { serviceId, name, faDisplayName, faDescription, actionType, jobName, enable, jenkinsInput, jenkinsOutput } = values;
      const result = await AdminPanelQuery<IServiceJenkinsAction>({
        url: `/service/${serviceId}/jenkins/action`,
        method: ERequest.POST,
        data: { name, faDisplayName, faDescription, actionType, jobName, enable, jenkinsInput, jenkinsOutput },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`اکشن جنکینز جدید با موفقیت اضافه گردید.`);
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
