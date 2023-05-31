import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IUser } from '../../Interfaces/User.interface';

export default function useUpdateVersion() {
  const key = 'userInfo';
  return useMutation(
    async (values: { appVersionLastSeen: string; callBack?: () => void }) => {
      const { appVersionLastSeen } = values;
      return await DiningPanelQuery<IUser>({
        url: `/user/info`,
        method: ERequest.PUT,
        data: { appVersionLastSeen },
      });
    },
    {
      onMutate: (values) => {},
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
      onError: (error, values, rollback) => {
        console.error(error);
      },
    },
  );
}
