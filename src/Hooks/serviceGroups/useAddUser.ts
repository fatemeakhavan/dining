import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IUserGroup } from '../../Interfaces/UserGroup.interface';

export default function useAddUser() {
  const key = 'group';
  return useMutation(
    async (values: { groupName: string; userId: number; callBack?: () => void }) => {
      const { groupName } = values;
      const { userId } = values;
      const result = await AdminPanelQuery<IUserGroup>({
        url: `group/${groupName}/user/${userId}`,
        method: ERequest.POST,
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`کاربر با موفقیت  اضافه شد.`);
        if (values.callBack) {
          values.callBack();
        }
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
