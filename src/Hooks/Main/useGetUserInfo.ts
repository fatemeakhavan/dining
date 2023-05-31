import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';


export default function useGetUserInfo() {
  return useQuery(
    `userInfo`,
    async () => {
      const userInfoResult = await DiningPanelQuery<any>({
        url: `user/info`,
        method: ERequest.GET,
      });
      return userInfoResult.result;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
}
