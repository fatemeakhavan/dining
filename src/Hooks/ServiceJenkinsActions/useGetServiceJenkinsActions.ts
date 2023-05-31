import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceJenkinsAction } from '../../Interfaces/ServiceJenkinsAction.interface';
import { IAdminPanelResult } from '../../Interfaces/App.interface';

export default function useGetServiceJenkinsActions(serviceId: number) {
  return useQuery(
    `service-jenkins-action`,
    async () => {
      let [serviceJenkinsActionsResult] = await getServiceJenkinsActions(serviceId);
      let JenkinsActions: IServiceJenkinsAction[] = [];
      if (serviceJenkinsActionsResult) {
        JenkinsActions = serviceJenkinsActionsResult.result;
      }
      return JenkinsActions;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceJenkinsActions = (serviceId: number): Promise<[IAdminPanelResult<IServiceJenkinsAction[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceJenkinsActionsResult = await AdminPanelQuery<IServiceJenkinsAction[]>({
        url: `service/${serviceId}/jenkins/action`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([serviceJenkinsActionsResult]);
    } catch (error) {
      reject(error);
    }
  });
};

