import { Box, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NotFoundImage from '../../Assets/img/notfound.png';

const Index = () => {
  const [redirect, setRedirect] = useState(false);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ minHeight: ' calc(100vh - 195px)' }}>
      {redirect ? <Redirect to="/" /> : null}
      <Box position="relative">
        <img src={NotFoundImage} alt="not-found" />
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            bottom: 0,
            fontSize: '75px',
            color: '#45b8e8',
          }}
        >
          {' '}
          ۴۰۴
        </span>
      </Box>
      <Typography variant="h2" component="h2" style={{ fontSize: '26px', margin: '15px 0' }}>
        صفحه مورد نظر پیدا نشد.
      </Typography>
      <Button variant="contained" color="primary" style={{ minWidth: '100px', marginTop: '15px' }} onClick={() => setRedirect(true)}>
        بازگشت
      </Button>
    </Box>
  );
};

export default Index;
