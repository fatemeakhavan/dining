import { useQuery } from 'react-query';
import { ERequest } from 'Enums/App.enums';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { ILocation } from '../../Interfaces/Location.interface';

export default function useGetLocations() {
  return useQuery(
    `location`,
    async () => {
      let locationsResult: IAdminPanelResult<ILocation[]>;
      let locations: ILocation[] = [];
      [locationsResult] = await getLocations();
      if (locationsResult) {
        locations = locationsResult.result;
      }
      return locations;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
}

const getLocations = (): Promise<[IAdminPanelResult<ILocation[]>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const locationsResult = await DiningPanelQuery<ILocation[]>({
        url: `location`,
        method: ERequest.GET,
        params: {
          size: '1000',
        },
      });
      resolve([locationsResult]);
    } catch (error) {
      reject(error);
    }
  });
};
