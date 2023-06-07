import React, { useEffect, useState } from 'react';
import { StylesProvider, jssPreset, ThemeProvider, Theme } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { create } from 'jss';
import AppRoutes from './Routes';
import { Themes } from './Themes/Index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Box, makeStyles, Switch, Typography } from '@material-ui/core';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// theme enum
enum EThemes {
  DefaultTheme = 'DefaultTheme',
  LightTheme = 'LightTheme',
  DarkTheme = 'DarkTheme',
}

const useStyles = makeStyles((theme) => ({
  themeSwitch: {
    left: '10%',
    top: '15px',
    zIndex: 999,
    display: 'none',
    alignItems: 'center',
    position: 'absolute',

    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
}));

const App = () => {
  const [theme, setTheme] = useState<Theme>(Themes.DarkTheme);
  const [state, setState] = React.useState(true);
  const classes = useStyles();

  useEffect(() => {
    const themePanel: EThemes = localStorage.getItem('theme') as EThemes;
    setTheme(Themes[themePanel] || Themes.DarkTheme);
  }, []);

  const changeTheme = () => {
    setState(!state);
    if (theme === Themes.DarkTheme) {
      setTheme(Themes.DefaultTheme);
    } else if (theme !== Themes.DarkTheme) {
      setTheme(Themes.DarkTheme);
    }
  };

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" className="main-wrapper">
          {window.location.pathname !== '/auth' && (
            <Box className={classes.themeSwitch}>
              <Typography component="label" style={{ display: 'flex' }}>
                حالت تیره
              </Typography>
              <Switch checked={state} onChange={changeTheme} name="checkedB" color="primary" />
            </Box>
          )}
          <AppRoutes />
        </div>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
