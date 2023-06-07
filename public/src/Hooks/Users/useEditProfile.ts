import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';

export default function useEditProfile() {
  const key = 'profile';
  return useMutation(
    async (values: { sendSms: boolean; locationId: string; callBack?: () => void }) => {
      const { locationId, sendSms } = values;
      return await DiningPanelQuery<any>({
        url: `/user/info`,
        method: ERequest.PUT,
        data: { sendSms, locationId },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`مشخصات کاربری با موفقیت ویرایش شد.`);
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
