import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from 'Interfaces/App.interface';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceGroup } from '../../Interfaces/ServiceGroup.interface';

export default function useGetServiceGroups() {
  return useQuery(
    `service-group`,
    async () => {
      let [serviceGroupsResult] = await getServiceGroups();
      let memberGroups: IServiceGroup[] = [];
      if (serviceGroupsResult) {
        memberGroups = serviceGroupsResult.result;
      }
      return memberGroups;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceGroups = (): Promise<[IAdminPanelResult<IServiceGroup[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceGroupsResult = await AdminPanelQuery<IServiceGroup[]>({
        url: `service/group`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([serviceGroupsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
