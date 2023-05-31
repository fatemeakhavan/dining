import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const LightTheme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'test',
    body1: {
      fontSize: '14px',
    },
  },
  shape: {
    borderRadius: 2,
  },
  spacing: 8,
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
    },
    MuiTextField: {
      InputLabelProps: {
        shrink: true,
      },
    },
  },
});
