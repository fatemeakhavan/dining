import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from 'Interfaces/App.interface';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IService } from '../../Interfaces/Service.interface';

export default function useGetService(serviceId: number) {
  return useQuery(
    `service`,
    async () => {
      let [serviceResult] = await getService(serviceId);
      let service: IService = {
        faDisplayName: '',
        faDescription: '',
        maintenanceMode: false,
        id: 0,
        name: 'trs',
        type: 'MANAGED',
        enable: false,
        groupId: 0,
        created: '',
        updated: '',
        validNodeCounts: [],
        clusterMode: false,
      };
      if (serviceResult) {
        service = serviceResult.result;
      }
      return service;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getService = (serviceId: number): Promise<[IAdminPanelResult<IService>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceResult = await AdminPanelQuery<IService>({
        url: `service/${serviceId}`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([serviceResult]);
    } catch (error) {
      reject(error);
    }
  });
};
