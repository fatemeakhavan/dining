import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IUserGroup } from '../../Interfaces/UserGroup.interface';

export default function useCreateUserGroup() {
  const key = 'group';
  return useMutation(
    async (values: { name: string; title: string; description?: string; callBack?: () => void }) => {
      const { name, title, description } = values;
      const result = await AdminPanelQuery<IUserGroup>({
        url: `group`,
        method: ERequest.POST,
        data: { name, title, description },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`گروه کاربری جدید با موفقیت اضافه گردید.`);
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
