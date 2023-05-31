import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IUserGroup } from '../../Interfaces/UserGroup.interface';
import DiningPanelQuery, { IDiningPanelResult } from '../../Helpers/DiningPanelQuery';

export default function useGetUserGroups() {
  return useQuery(
    `group`,
    async () => {
      let [userGroupsResult] = await getUserGroups();
      let memberGroups: IUserGroup[] = [];
      if (userGroupsResult) {
        memberGroups = userGroupsResult.result;
      }
      return memberGroups;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getUserGroups = (): Promise<[IDiningPanelResult<IUserGroup[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userGroupsResult = await DiningPanelQuery<IUserGroup[]>({
        url: `/group`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([userGroupsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
