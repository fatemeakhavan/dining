import { useMutation } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { queryClient } from 'index';
import { toast } from 'react-toastify';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { IMeal } from '../../Interfaces/Meal.interface';

export default function useAddMeal() {
  const key = 'meal';
  return useMutation(
    async (values: { meals: IMeal[]; callBack?: () => void }) => {
      const { meals } = values;
      return await DiningPanelQuery<IMeal[]>({
        url: `/meal/register`,
        method: ERequest.PUT,
        data: { meals: meals },
      });
    },
    {
      onMutate: (values) => {},
      onSuccess: (result, values) => {
        toast.success(`وعده غذایی جدید با موفقیت اضافه گردید.`);
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
