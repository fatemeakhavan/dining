import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Spinner from 'Spinner';
import { useStyles } from './Styles';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import logo from '../../Assets/img/logo.png';
import Manifest from '../../mainifest';
import { useHistory } from 'react-router-dom';

const Index = () => {
  const [loading, setLoading] = useState(false);
  if (!loading) {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if (!reloadCount || parseInt(reloadCount, 0) < 2) {
      sessionStorage.setItem('reloadCount', String(((reloadCount as unknown) as string) + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }

  const history = useHistory();
  const classes = useStyles();
  const handleClick = async () => {
    setLoading(true);
    const url = `${Manifest.diningPanel}auth/podsso`;
    window.location.assign(url);
  };

  const getParameterByName = (name: string, url: string) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  const param = window.location.search;
  const accessToken = getParameterByName('accessToken', param);
  const refreshToken = getParameterByName('refreshToken', param);
  const expiresIn = getParameterByName('expiresIn', param);
  const isUserActive = getParameterByName('isUserActive', param);
  if (accessToken && refreshToken) {
    localStorage.setItem('POD_APP:ACCESS_TOKEN', accessToken);
    localStorage.setItem('POD_APP:REFRESH_TOKEN', refreshToken);
    window.localStorage.setItem('POD_APP:EXPIRE_TIME', `${+new Date()}`);
    history.push('/');
  }

  return (
    <>
      <Box width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center" className={classes.root}>
        <Box position="relative">
          {/*<Box className={classes.dotPattern}></Box>*/}
          {/*<Box className={classes.dotPatternSecond}></Box>*/}
          <Box className={classes.imageWrapper}>
            <Box flex="1" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Box width="100%" textAlign="center" marginBottom="15px">
                <img src={logo} width="170px" alt="logo" />
              </Box>
              <Typography variant="h2" component="h2" className={classes.welcome}>
                <b>پنل رزرو غذا</b>
              </Typography>
              {isUserActive && isUserActive === 'false' ? (
                <Typography variant="h6" component="h6" className={classes.podGate}>
                  حساب کاربری شما فعال نیست.
                </Typography>
              ) : (
                <Typography variant="h6" component="h6" className={classes.podGate}>
                  برای ورود باید از درگاه POD استفاده کنید
                </Typography>
              )}
              <Box minHeight="150px" width="100%" display="flex" justifyContent="center" alignItems="center">
                {loading ? (
                  <Box display="inline-block" position="relative">
                    <Spinner />
                  </Box>
                ) : (
                  <Button color="primary" onClick={handleClick} className={classes.button}>
                    برای ورود کلیک کنید
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Index;
