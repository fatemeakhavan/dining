import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IUserGroup } from '../../Interfaces/UserGroup.interface';

export default function useEditUserGroup() {
  const key = 'group';
  return useMutation(
    async (values: { userGroupName: string; name: string; title: string; description?: string; callBack?: () => void }) => {
      const { name, title, description, userGroupName } = values;
      const result = await AdminPanelQuery<IUserGroup>({
        url: `group/${userGroupName}`,
        method: ERequest.PUT,
        data: { name, title, description },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`گروه کاربری با موفقیت به روز رسانی گردید.`);
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
