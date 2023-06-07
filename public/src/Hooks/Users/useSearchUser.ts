import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import DiningPanelQuery, { IDiningPanelResult } from '../../Helpers/DiningPanelQuery';
import { IUser } from '../../Interfaces/User.interface';

export default function useSearchUser(username: string) {
  return useQuery(
    `user`,
    async () => {
      let [usersResult] = await getUserByUsername(username);
      let users: IUser[] = [];
      if (usersResult) {
        users = usersResult.result;
      }
      return users;
    },
    {
      retry: false,
      enabled: false,
      onSuccess: () => {},
    },
  );
}

const getUserByUsername = (username: string): Promise<[IDiningPanelResult<IUser[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userResult = await DiningPanelQuery<IUser[]>({
        url: `/user/search`,
        method: ERequest.GET,
        params: {
          username: username,
        },
      });
      resolve([userResult]);
    } catch (error) {
      reject(error);
    }
  });
};
