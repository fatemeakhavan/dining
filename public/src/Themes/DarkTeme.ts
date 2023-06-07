import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const DarkTheme = createMuiTheme({
  direction: 'rtl',
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: 'IRANYekan , IRANYekanEn',
    body1: {
      fontSize: '14px',
      margin: 0,
      direction: 'ltr',
    },
    h1: {
      fontSize: '40px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
    },
    h2: {
      fontSize: '36px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
    },
    h3: {
      fontSize: '35',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
    },
    h4: {
      fontSize: '28px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
    },
    h5: {
      fontSize: '20px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
      '&.title': {
        marginBottom: '30px',
        width: '100%',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#000',
      },
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
    MuiIconButton: {
      root: {
        fontFamily: 'IRANYekan , IRANYekanEn',
        '&:focus': {
          backgroundColor: 'transparent',
        },
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiInput: {
      underline: {
        '&::before': {
          borderBottom: '0 !important',
        },
      },
    },
    MuiInputBase: {
      root: {
        minWidth: '150px',
        padding: 0,
        border: 'solid 1px #afc1d8',
        fontSize: '13px',
        borderRadius: '4px',
      },
    },
    MuiSelect: {
      select: {
        paddingLeft: '12px',
        marginLeft: '0',
        marginRight: '0',
        marginBottom: '-1px',
        paddingTop: '10px',
        paddingBottom: '10px',
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiFormControl: {
      root: {
        '& .MuiInputBase-formControl': {
          border: 'none',
          outline: 'none',
          textAlign: 'left',
          borderWidth: '1px !important',
          '&:hover': {
            border: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
              outline: 'none',
            },
          },
        },
        '& .MuiFormHelperText-contained': {
          direction: 'ltr',
          textAlign: 'right',
        },
        '& .MuiOutlinedInput-multiline': {
          padding: 0,
        },
        '&.none-border-right': {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0 3px 3px 0',
          },
        },
        '&.none-border-left': {
          '& .MuiOutlinedInput-root': {
            borderRadius: '3px 0 0 3px',
          },
        },
      },
    },
    MuiDialog: {
      root: {
        '&.custom-fullscreen': {
          left: '45px !important',
          right: '45px !important',
          top: '45px !important',
          borderRadius: '4px 4px 0 0',
          overflow: 'hidden',
        },
      },
      paper: {
        padding: '15px 15px 23px 15px',
        minWidth: '612px',
        '@media (max-width: 600px)': {
          maxWidth: '100% !important',
          minWidth: 'calc(100% - 5px)',
        },
        '&.MuiDialog-paperFullScreen': {
          direction: 'ltr',
          padding: 0,
          margin: '15px',
          top: 0,
          bottom: 0,
          height: 'calc(100vh - 30px)',
          borderRadius: '3px',
        },
      },
    },
    MuiDialogTitle: {
      root: {
        textAlign: 'left',
        padding: '16px 8px',
        '& .MuiTypography-root': {
          textAlign: 'left',
          fontWeight: 'bold',
        },
      },
    },
    MuiDialogActions: {
      root: {
        justifyContent: 'flex-end',
        direction: 'ltr',
      },
    },
    MuiDialogContent: {
      root: {
        textAlign: 'left',
        minHeight: '100px',
      },
    },
    MuiTableCell: {
      root: {
        padding: '10px',
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: '18px',
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
