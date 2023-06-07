import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const palette = {
  background: {
    default: '#fafafa',
    drawer: '#e0f7fa',
  },
  primary: {
    light: '#ff867c',
    main: '#ef5350',
    dark: '#b61827',
    contrastText: '#fff',
  },
  primaryOld: {
    light: '#afc1d8',
    main: '#5374a9',
    dark: '#002884',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ff9b9b',
    main: '#f44336',
    dark: '#b52a2a',
    contrastText: '#000',
  },
  color: {
    disabled: '#c3c3c3',
  },
  grey: {
    100: '#f5f8fb',
    200: '#e5e9ef',
    300: '#bebebe',
    400: '#707070',
    600: '#afc1d8',
  },
  text: {
    primary: '#3e4a4d',
  },
};

export const DefaultTheme = createMuiTheme({
  direction: 'rtl',
  palette,
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
      color: palette.primary.main,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: palette.primary.main,
    },
    h3: {
      fontSize: '35',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: palette.primary.main,
    },
    h4: {
      fontSize: '28px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: palette.primary.main,
    },
    h5: {
      fontSize: '20px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: palette.primary.main,
    },
    h6: {
      fontSize: '18px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.05',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: palette.primary.main,
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
    borderRadius: 4,
  },
  spacing: 8,
  overrides: {
    MuiPaper: {
      root: {
        '&.MuiPaper-elevation0': {
          boxShadow: '0 1px 4px 0 rgba(21, 34, 50, 0.08)',
        },
        '&.MuiPaper-outlined': {
          borderColor: palette.grey[200],
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        '*': {
          scrollBehavior: 'smooth',
        },
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
          backgroundColor: '#F5F5F5',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': ' inset 0 0 6px #d6d6d6',
          backgroundColor: '#F5F5F5',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: palette.primary.light,
        },
        '.MuiTreeView-root': {
          '& .MuiTreeItem-root': {
            '& .MuiTreeItem-group': {
              marginLeft: 7,
              paddingLeft: 18,
            },
            '& .MuiTreeItem-content': {
              minWidth: '200px',
              minHeight: '28px',
              '& .MuiTreeItem-label': {
                color: palette.primary.main,
                fontSize: '12px',
                fontWeight: 'normal',
                fontStretch: 'normal',
                fontStyle: 'normal',
              },
              '& .MuiTreeItem-iconContainer': {
                position: 'relative',
                '& .close': {
                  opacity: 0.3,
                },
              },
            },
          },
          '&.folder-tree': {
            flex: 1,
            height: '100%',
            overflowX: 'auto',
            paddingLeft: '20px',
            '& .MuiTreeItem-iconContainer': {
              width: 'auto',
              display: 'flex',
              justifyContent: 'flex-end',
            },
          },
        },
        '.MuiAlert-root': {
          direction: 'ltr',
        },
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: 0,
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: '64px',
        '@media (max-width: 600px)': {
          minHeight: '64px',
        },
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        padding: '0 36px',
        '@media (max-width: 600px)': {
          padding: '0 5px',
        },
      },
    },
    MuiCardActions: {
      root: {
        padding: '12px',
        borderTop: `1px solid ${palette.primary.main}`,
      },
    },
    MuiContainer: {
      root: {
        minWidth: '100%',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        boxShadow: 'none',
        height: '36px',
        '&.MuiButton-outlined': {
          border: `solid 1px ${palette.grey['600']}`,
          color: palette.primary.main,
          '&:hover': {
            backgroundColor: palette.background.drawer,
          },
        },
        '&.MuiButton-contained': {
          boxShadow: 'none',
          color: palette.primary.main,
          '&:active': {
            boxShadow: 'none',
          },
          '&:hover': {
            boxShadow: 'none',
          },
          '&.MuiButton-containedPrimary': {
            color: '#FFF',
          },
          '&.MuiDefault': {
            backgroundColor: palette.grey[200],
          },
        },
        '&.MuiButton-containedSizeLarge': {
          height: '48px',
          fontSize: '22px',
        },
        '&.MuiButton-outlinedPrimary': {
          color: palette.primary.main,
          borderColor: palette.primary.main,
          '&:hover': {
            backgroundColor: '#5374a926',
          },
        },
        '&.MuiButton-outlinedSecondary': {
          color: palette.secondary.main,
        },
        '&.Mui-disabled': {
          color: palette.color.disabled,
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
          marginLeft: '-15px',
        },
      },
    },
    MuiDrawer: {
      root: {
        '&.main-menu': {
          '& .MuiPaper-root': {
            transition: '0.7s',
            maxWidth: '100%',
            boxShadow: '0 4px 1px 0 rgba(0, 0, 0, 0.16)',
            '& .MuiList-root': {
              padding: '0',
              '& .MuiListItem-root': {
                padding: '8px 16px 8px 16px',
                borderLeft: 'none',
                borderRight: 'none',
                marginBottom: '5px',
                color: palette.primary.main,
                background: '#FFF',
                fontSize: '20px',
                fontWeight: 'normal',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.1',
                letterSpacing: 'normal',
                textAlign: 'right',
                maxWidth: '100%',
                '& .MuiListItemIcon-root': {
                  marginLeft: '15px',
                  minWidth: 0,
                },
                '&.Mui-selected': {
                  background: palette.background.drawer,
                  '& .MuiListItemIcon-root': {
                    '& .MuiSvgIcon-root': {
                      stroke: palette.primary.main,
                      fill: palette.primary.main,
                      '& path ,& g ,& circle,& rect': {
                        stroke: palette.primary.main,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      paper: {},
    },
    MuiTableContainer: {
      root: {
        boxShadow: 'none',
        border: `1px solid ${palette.grey[200]}`,
        borderRadius: '4px',
        padding: '10px 15px',
      },
    },
    MuiTableHead: {
      root: {
        borderBottom: `1px solid ${palette.grey[200]}`,
      },
    },
    MuiTableRow: {
      root: {
        '&.hover': {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: palette.grey[100],
          },
        },
        '&.active': {
          backgroundColor: palette.background.drawer,
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: 'none',
        padding: '10px',
        '&.MuiTableCell-head': {
          fontWeight: 'bold',
          color: palette.primary.main,
        },
        '&.MuiTableCell-footer': {
          '& .MuiTablePagination-toolbar': {
            padding: '35px 0 0 0',
            '& .MuiTablePagination-spacer': {
              display: 'none',
            },
            '& .MuiTablePagination-caption': {
              display: 'none',
            },
          },
        },
        '& .MuiSvgIcon-root': {
          fontSize: '18px',
        },
        '&.MuiTableCell-body': {
          color: palette.primary.main,
          fontSize: '12px',
        },
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
        '&.Mui-disabled': {
          '& svg': {
            color: palette.grey[300],
          },
        },
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
    MuiInputBase: {
      root: {
        border: `solid 1px ${palette.grey['600']}`,
        minWidth: '150px',
        padding: 0,
        fontSize: '13px',
        color: palette.primary.main,
        borderRadius: '4px',
        '&.Mui-focused': {
          '& path ,& g ,& circle,& rect': {
            fill: palette.primary.main,
          },
        },
        '&.Mui-disabled': {
          background: palette.grey[100],
          borderColor: `${palette.grey[100]} !important`,
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
          color: palette.text.primary,
          '&:hover': {
            border: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
              outline: 'none',
            },
          },
        },
        '& .MuiFormHelperText-contained': {
          color: palette.secondary.main,
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
        '&.file-input': {
          '& .MuiFormHelperText-contained': {
            color: `${palette.secondary.main} !important`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px !important',
        },
        '& .MuiOutlinedInput-input': {
          textAlign: 'left',
          padding: '11px 14px',
        },
        '& .MuiOutlinedInput-inputAdornedStart': {
          paddingLeft: 0,
        },
      },
    },
    MuiList: {
      root: {
        maxHeight: '250px',
        '&.MuiList-padding': {
          paddingRight: '0 !important',
        },
      },
    },
    MuiListItem: {
      root: {
        justifyContent: 'flex-end',
        '&.Mui-selected': {
          background: palette.background.drawer,
        },
      },
    },
    MuiListItemIcon: {
      root: {
        '& .MuiSvgIcon-root': {
          color: palette.primary.main,
        },
      },
    },
    MuiMenu: {
      paper: {
        boxShadow: 'none',
        border: `1px solid ${palette.grey['600']}`,
      },
    },
    MuiMenuItem: {
      root: {
        minWidth: '180px',
        justifyContent: 'flex-start',
        '& a': {
          textDecoration: 'none',
          display: 'block',
          width: '100%',
          color: 'inherit',
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(38, 153, 251, 0.2)',
        backdropFilter: 'blur(3px)',
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
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      disableRipple: true,
    },
    MuiTextField: {
      InputLabelProps: {
        shrink: true,
      },
    },
    MuiIconButton: {
      disableRipple: true,
    },
    MuiSelect: {
      disableUnderline: true,
      MenuProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      },
    },
  },
});
