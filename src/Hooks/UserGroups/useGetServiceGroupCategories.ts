import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from 'Interfaces/App.interface';
import AdminPanelQuery from '../../Helpers/AdminPanelQuery';
import { IServiceGroupCategory } from '../../Interfaces/ServiceGroupCategory.inteface';

export default function useGetServiceGroupCategories() {
  return useQuery(
    `service-group-category`,
    async () => {
      let [serviceGroupCategoriesResult] = await getServiceGroupCategories();
      let GroupCategories: IServiceGroupCategory[] = [];
      if (serviceGroupCategoriesResult) {
        GroupCategories = serviceGroupCategoriesResult.result;
      }
      return GroupCategories;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getServiceGroupCategories = (): Promise<[IAdminPanelResult<IServiceGroupCategory[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceGroupCategoriesResult = await AdminPanelQuery<IServiceGroupCategory[]>({
        url: `/service/category`,
        method: ERequest.GET,
      });
      resolve([serviceGroupCategoriesResult]);
    } catch (error) {
      reject(error);
    }
  });
};
