import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import { IServiceQuota } from '../../Interfaces/ServiceQuota.interface';

export default function useGetServiceDefaultQuota() {
  return useQuery(
    `service-default-quota`,
    async () => {
      let [serviceDefaultQuotaResult] = await getServiceDefaultQuota();
      let DefaultQuota: IServiceQuota = {
        displayName: '',
        description: '',
        id: 1,
        name: '',
        maxCpu: 0,
        maxMemory: 0,
        maxDisk: 0,
        created: '',
        updated: '',
      };
      if (serviceDefaultQuotaResult) {
        DefaultQuota = serviceDefaultQuotaResult.result;
      }
      return DefaultQuota;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceDefaultQuota = (): Promise<[IAdminPanelResult<IServiceQuota>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceDefaultQuotaResult = await AdminPanelQuery<IServiceQuota>({
        url: `/service/quota/default`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([serviceDefaultQuotaResult]);
    } catch (error) {
      reject(error);
    }
  });
};
