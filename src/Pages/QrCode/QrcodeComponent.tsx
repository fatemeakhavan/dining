import React from 'react';
import { useGetQrcode } from '../../Hooks/Qrcode/useGetQrcode';

const QrcodeComponent = () => {
  const qrcodeHook = useGetQrcode(805);
  let imgUrl = '';
  if(qrcodeHook?.data) {
    imgUrl = qrcodeHook?.data;
  }
  return (
    <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <img src={imgUrl} />
    </div>
  );
};
export default QrcodeComponent;
