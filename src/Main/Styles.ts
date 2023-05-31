import { green, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import ImageRepo from '../Assets/img/repo.jpeg';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 4px',
    height: '64px',
  },
  menuButtonHidden: {
    display: 'none',
  },
  toggleSideBar: {
    border: `solid 1px ${theme.palette.grey[200]}`,
    borderRadius: '4px',
    marginRight: '5px',
    padding: '6px',
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'inherit',
    },
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '243px',
    minWidth: '243px',
    maxWidth: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: '100%',
    overflowX: 'hidden',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      height: '100%',
    },
  },
  drawerPaperClose: {
    [theme.breakpoints.down('md')]: {
      left: '-100%',
      width: '243px',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    minHeight: 'calc(100vh - 129px)',
    padding: theme.spacing(4),
    position: 'relative',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },

  footer: {
    height: '65px',
    color: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    padding: '0 25px',
    justifyContent: 'flex-end',
    '& h5': {
      direction: 'rtl',
      '& span': {
        marginLeft: '3px',
      },
    },
  },
  select: {
    minWidth: '612px !important',
    top: '52px !important',
    maxWidth: '500px',
    [theme.breakpoints.down('md')]: {
      left: '5px !important',
      right: '5px !important',
      maxWidth: '100%',
      minWidth: 'inherit !important',
    },
  },
  selectedRepoName: {
    color: green[500],
    borderBottom: `1px solid ${green[500]}`,
    padding: '0 5px 5px 5px',
  },
  emptyRepo: {
    color: '#d4a344',
    borderBottom: '1px solid #d4a344',
    padding: '0 5px 5px 5px',
  },
  MenuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '25px',
    marginBottom: '8px',
  },
  h4: {
    fontSize: '24px',
    marginTop: '6px',
  },
  h6: {
    marginLeft: '36px',
    color: '#5374a9',
    fontWeight: 100,
    marginBottom: '3px',
    width: 'calc(100% - 36px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
  IconButton: {
    marginRight: '16px',
    padding: 0,
  },
  BreadCrumb: {
    width: '100%',
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: '0 0 35px 0',
    flexWrap: 'wrap',
    '& li': {
      color: theme.palette.primary.main,
      margin: '0 14px 10px 0',
      display: 'flex',
      alignItems: 'center',
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
    },
  },
  imageWrapper: {
    backgroundImage: 'url(' + ImageRepo + ')',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 0',
    outline: 'none',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '165px',
  },
  logoWrapper: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    maxWidth: 'calc(100% - 35px)',
    padding: '20px 0',
    margin: '0 auto',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  drawerToggle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(38, 153, 251, 0.2)',
    backdropFilter: 'blur(3px)',
    zIndex: 1,
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'inline-block',
    },
  },
  username: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  userImage: {
    borderRadius: '50%',
    display: 'inline-block',
    width: '135px',
    height: '135px',
  },
  outBtn: {
    color: theme.palette.secondary.dark,
    width: '150px',
    border: `solid 1px ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.background.default,
  },
  profile: {
    '& .MuiMenu-paper': {
      maxWidth: '100%',
      height: '360px',
      '& .MuiList-padding': {
        padding: 0,
        width: '100% !important',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
      },
    },
  },
  profileMenu: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '275px',
    maxWidth: '100%',
    outline: 'none',
  },
  profileBtn: {
    marginLeft: theme.spacing(2),
    minWidth: '120px',
    background: 'transparent !important',
  },
  nonDecoarateLink: {
    textDecoration: 'none',
  },
  Collapse: {
    marginLeft: '30px',
    borderLeft: `1px dashed ${theme.palette.grey[200]}`,
  },
  version: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    textAlign: 'center',
    fontSize: '12px',
    padding: '6px 0',
    color: theme.palette.text.hint,
  },
}));
