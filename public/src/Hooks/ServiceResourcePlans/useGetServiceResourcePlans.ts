import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import { IServiceResourcePlan } from '../../Interfaces/ServiceResourcePlan.interface';

export default function useGetServiceResourcePlans(serviceId: number) {
  return useQuery(
    `service-resource-plan`,
    async () => {
      let [serviceResourcePlansResult] = await getServiceResourcePlans(serviceId);
      let ResourcePlans: IServiceResourcePlan[] = [];
      if (serviceResourcePlansResult) {
        ResourcePlans = serviceResourcePlansResult.result;
      }
      return ResourcePlans;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceResourcePlans = (serviceId: number): Promise<[IAdminPanelResult<IServiceResourcePlan[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceResourcePlansResult = await AdminPanelQuery<IServiceResourcePlan[]>({
        url: `service/${serviceId}/resource/plan`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([serviceResourcePlansResult]);
    } catch (error) {
      reject(error);
    }
  });
};
