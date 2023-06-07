import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceGroup } from '../../Interfaces/ServiceGroup.interface';

export default function useCreateServiceGroup() {
  const key = 'service-group';
  return useMutation(
    async (values: {
      name: string;
      faDisplayName: string;
      faDescription: string;
      logo: string;
      categoryId: string;
      tags?: string[];
      callBack?: () => void;
    }) => {
      const { name, faDisplayName, faDescription, logo, tags, categoryId } = values;
      const result = await AdminPanelQuery<IServiceGroup>({
        url: `/service/group`,
        method: ERequest.POST,
        data: { name, faDisplayName, faDescription, logo, tags, categoryId },
      });
      return result;
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`گروه سرویس جدید با موفقیت اضافه گردید.`);
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
