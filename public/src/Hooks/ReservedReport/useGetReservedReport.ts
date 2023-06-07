import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IReservedReport } from '../../Interfaces/ReservedReport.interface';

export default function useGetReservedReport(dateId: number, mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER') {
  return useQuery(
    `report${dateId}`,
    async () => {
      let reportResult: IAdminPanelResult<IReservedReport[]>;
      let report: IReservedReport[] = [];
      [reportResult] = await getReports(dateId, mealType);
      if (reportResult) {
        report = reportResult.result;
      }
      return report;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getReports = (
  dateId: number,
  mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER',
): Promise<[IAdminPanelResult<IReservedReport[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const reportResult = await DiningPanelQuery<IReservedReport[]>({
        url: `meal/reserve/report`,
        method: ERequest.GET,
        params: {
          size: '1000',
          dateId: dateId,
          mealType: mealType,
        },
      });
      resolve([reportResult]);
    } catch (error) {
      reject(error);
    }
  });
};
