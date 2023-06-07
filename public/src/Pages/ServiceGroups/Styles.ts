import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2),
    width: '100%',
  },
  searchInput: {
    minWidth: '214px',
    maxWidth: '100%',
  },
  createGroupInput: {
    marginBottom: '15px',
    '& .MuiInputBase-root': {
      direction: 'rtl',
      '& .MuiInputAdornment-root': {
        '& p': {
          direction: 'rtl',
        },
      },
      '& input': {
        textAlign: 'right',
      },
    },
  },
  h3: {
    color: theme.palette.primary.main,
    fontSize: '23px',
    fontWeight: 'bold',
    marginLeft: '10px',
    textAlign: 'left',
  },
  repoTableTitle: {
    marginTop: '55px',
  },
  h6: {
    color: '#FFF',
    marginBottom: theme.spacing(2),
    display: 'inline-block',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  },
  h5: {
    color: theme.palette.grey[600],
  },
  p: {
    color: '#FFF',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  },
  BreadCrumb: {
    width: '100%',
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    flexWrap: 'wrap',
    margin: 0,
    '& li': {
      color: theme.palette.primary.main,
      margin: '0 14px 10px 0',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '&.active': {
        color: theme.palette.grey[300],
      },
      '& svg': {
        fontSize: '12px',
        color: theme.palette.primary.main,
        paddingLeft: '14px',
        display: 'inline-block',
        width: '25px',
      },
      '&.last': {
        color: theme.palette.grey[300],
      },
    },
  },
  treeContainer: {
    width: '275px',
    padding: '15px 15px 0 15px',
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tagsList: {
    display: 'flex',
    direction: 'ltr',
    listStyle: 'none',
    margin: '0',
    marginBottom: '15px',
    padding: theme.spacing(0.5),
    flexWrap: 'wrap',
    '& li': {
      margin: theme.spacing(0.5),
    },
  },
  tagInputBox: {
    display: 'flex',
    direction: 'ltr',
  },
}));
