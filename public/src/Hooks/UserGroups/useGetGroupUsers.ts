import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IGroupUser } from '../../Interfaces/Users.interface';

export default function useGetGroupUsers(groupName: string) {
  return useQuery(
    `group-${groupName}-users`,
    async () => {
      const result = await AdminPanelQuery<IGroupUser[]>({
        url: `group/${groupName}`,
        method: ERequest.GET,
      });

      return result;
    },
    {
      retry: false,
    },
  );
}
