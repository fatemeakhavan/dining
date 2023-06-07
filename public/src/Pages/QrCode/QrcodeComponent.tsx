import React, { useEffect, useState } from 'react';
import { useGetQrcode } from '../../Hooks/Qrcode/useGetQrcode';
import useGetToday from '../../Hooks/Date/useGetToday';
import { Box, Typography } from '@material-ui/core';

const QrcodeComponent = () => {
  const todayHook = useGetToday();
  const [todayId, setTodayId] = useState(0);
  const qrcodeHook = useGetQrcode(805);
  let imgUrl = '';
  useEffect(() => {
    if (todayHook?.data) {
      setTodayId(todayHook?.data?.id);
    }
  }, [todayHook]);
  useEffect(() => {
    if (todayId !== 0) {
      qrcodeHook.refetch();
    }
  }, [todayId]);

  if (qrcodeHook?.data) {
    imgUrl = qrcodeHook?.data;
  }
  return (
    <>
      {qrcodeHook?.isLoading ? (
        <div>لطفا صبر کنید</div>
      ) : imgUrl !== '' ? (
        <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <img src={imgUrl} />
        </div>
      ) : (
        <Box>
          <Typography>برای امروز غذای رزرو شده وجود ندارد</Typography>
        </Box>
      )}
    </>
  );
};
export default QrcodeComponent;
