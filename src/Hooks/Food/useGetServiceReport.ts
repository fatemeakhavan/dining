import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import { IServiceReport } from '../../Interfaces/ServiceReport.interface';

export default function useGetServiceReport(serviceId: number, reportId: number) {
  return useQuery(
    `service-report`,
    async () => {
      let [serviceReportsResult] = await getServiceReports(serviceId, reportId);
      let Report: IServiceReport = {
        id: 0,
        name: '',
        enDisplayName: '',
        faDisplayName: '',
        enDescription: '',
        faDescription: '',
        type: 'LIST',
        serviceId: 0,
      };
      if (serviceReportsResult) {
        Report = serviceReportsResult.result;
      }
      return Report;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceReports = (serviceId: number, reportId: number): Promise<[IAdminPanelResult<IServiceReport>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceReportsResult = await AdminPanelQuery<IServiceReport>({
        url: `service/${serviceId}/report/${reportId}`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([serviceReportsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
