import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import { IServiceReport } from '../../Interfaces/ServiceReport.interface';

export default function useGetServiceReports(serviceId?: number, creatorUsername?: string) {
  return useQuery(
    `service-report`,
    async () => {
      let serviceReportsResult: IAdminPanelResult<IServiceReport[]>;
      if (serviceId) {
        [serviceReportsResult] = await getServiceReports(serviceId);
      } else if (creatorUsername) {
        [serviceReportsResult] = await getServiceReports(undefined, creatorUsername);
      } else {
        [serviceReportsResult] = await getServiceReports();
      }
      let Reports: IServiceReport[] = [];
      if (serviceReportsResult) {
        Reports = serviceReportsResult.result;
      }
      return Reports;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceReports = (serviceId?: number, creatorUsername?: string): Promise<[IAdminPanelResult<IServiceReport[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceReportsResult = await AdminPanelQuery<IServiceReport[]>({
        url: serviceId ? `service/${serviceId}/report` : `service/report`,
        method: ERequest.GET,
        params: {
          size: '1000',
          creatorUsername: creatorUsername ? creatorUsername : null,
        },
      });
      resolve([serviceReportsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
