import { useQuery } from 'react-query';
import { IAdminPanelResult } from '../../Interfaces/App.interface';
import DiningPanelQuery from '../../Helpers/DiningPanelQuery';
import { ERequest } from '../../Enums/App.enums';

export const useGetQrcode = (dateId: number) => {
  return useQuery(
    `qrcode${dateId}`,
    async () => {
      let qrcodeResult: IAdminPanelResult<string>;
      let qrcode: string = '';
      [qrcodeResult] = await getQrcode(dateId);
      if (qrcodeResult) {
        qrcode = qrcodeResult.result;
      }
      return qrcode;
    },
    {
      retry: false,
      onSuccess: () => {},
    },
  );
};

const getQrcode = (dateId: number): Promise<[IAdminPanelResult<string>]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const qrcodeResult = await DiningPanelQuery<string>({
        url: `/meal/reserve/${dateId}/qr-code`,
        method: ERequest.GET,

      });
      resolve([qrcodeResult]);
    } catch (error) {
      reject(error);
    }
  });
};




