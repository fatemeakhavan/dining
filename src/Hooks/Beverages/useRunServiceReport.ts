import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IAdminPanelResult } from '../../Interfaces/App.interface';

export default function useGetRunServiceReports(serviceId: number, reportId: number) {
  return useQuery(
    `service-report-response`,
    async () => {
      let [serviceReportsResult] = await getServiceReports(serviceId, reportId);
      let ReportResponse;
      if (serviceReportsResult) {
        ReportResponse = serviceReportsResult.result;
      }
      return ReportResponse;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceReports = (serviceId: number, reportId: number): Promise<[IAdminPanelResult<any[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceReportsResult = await AdminPanelQuery<any[]>({
        url: `service/${serviceId}/report/${reportId}/run`,
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
