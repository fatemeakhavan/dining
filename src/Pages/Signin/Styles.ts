import { makeStyles } from '@material-ui/core';
import DotImage from '../../Assets/img/dot_pttrn.png';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f4f8f9',
  },
  themeSwitch: {
    display: 'none !important',
  },
  imageWrapper: {
    padding: '25px',
    borderRadius: '3px',
    backgroundColor: '#FFF',
    display: 'flex',
    position: 'relative',
    zIndex: 1,
    width: '600px',
    maxWidth: 'calc(100%)',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: '275px',
    },
  },
  button: {
    minWidth: '100px',
    height: '70px',
    background: 'transparent',
    color: '#3cc0f3',
    fontSize: '20px',
    border: '1px solid #b3e5fc',
    padding: '0 20px',
    marginTop: '15px',
  },
  welcome: {
    color: theme.palette.text.primary,
    fontSize: '30px',
  },
  podGate: {
    marginTop: 30,
    fontSize: '15px',
  },
  loginIcons: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  docOne: {
    position: 'absolute',
    right: 0,
    top: '75px',
  },
  docTwo: {
    position: 'absolute',
    right: '40px',
  },
  docThree: {
    position: 'absolute',
    bottom: '235px',
    right: '150px',
  },
  dotPattern: {
    backgroundImage: `url(${DotImage})`,
    position: 'absolute',
    zIndex: 0,
    bottom: '-45px',
    top: '-110px',
    left: '40px',
    minWidth: '300px',
  },
  dotPatternSecond: {
    backgroundImage: `url(${DotImage})`,
    top: '40px',
    right: 0,
    bottom: '40px',
    zIndex: 0,
    position: 'absolute',
    left: '-65px',
  },
}));
