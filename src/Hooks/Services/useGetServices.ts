import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from 'Interfaces/App.interface';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IService } from '../../Interfaces/Service.interface';

export default function useGetServices(serviceGroupId: number) {
  return useQuery(
    `service`,
    async () => {
      // if (serviceId) {
      //   let [serviceResult] = await getService(serviceId);
      //   let service: IService = {
      //     faDisplayName: '',
      //     faDescription: '',
      //     maintenanceMode: false,
      //     id: 0,
      //     name: 'trs',
      //     type: 'MANAGED',
      //     enable: false,
      //     groupId: 0,
      //     created: '',
      //     updated: '',
      //     validNodeCounts: [],
      //     clusterMode: false,
      //   };
      //   if (serviceResult) {
      //     service = serviceResult.result;
      //   }
      //   return service;
      // } else {
      let [servicesResult] = await getServices(serviceGroupId);
      let services: IService[] = [];
      if (servicesResult) {
        services = servicesResult.result;
      }
      return services;

      // }

    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServices = (serviceGroupId: number): Promise<[IAdminPanelResult<IService[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const servicesResult = await AdminPanelQuery<IService[]>({
        url: `service`,
        method: ERequest.GET,
        params: {
          size: '1000',
          serviceGroupId: serviceGroupId,
        },
      });
      resolve([servicesResult]);
    } catch (error) {
      reject(error);
    }
  });
};

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
