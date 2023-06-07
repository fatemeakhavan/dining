import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import { IUser } from '../../Interfaces/User.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';

export default function useActivateUser() {
  const key = 'user';
  return useMutation(
    async (values: { ssoId: number }) => {
      const { ssoId } = values;
      const result = await DiningPanelQuery<IUser>({
        url: `user/${ssoId}/activate`,
        method: ERequest.PUT,
        data: { ssoId },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`کاربر با موفقیت فعال شد.`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
      onError: (error, values, rollback) => {
        console.error(error);
        //if (rollback) rollback();
      },
    },
  );
}
