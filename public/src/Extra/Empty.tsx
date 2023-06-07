import React, { ReactChild, ReactChildren } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import alert from '../Assets/img/alert.svg';

interface IProps {
  message: string;
  buttonMessage?: string;
  ButtonClick?: () => void;
  size?: 'mini' | 'medium';
  children?: ReactChild | ReactChildren;
}

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    '&.mini': {
      '& button': {
        height: '45px',
        fontSize: '16px',
      },
      '& .MuiTypography-root': {
        fontSize: '18px',
      },
    },
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    color: '#45b8e8',
  },
  button: {
    minWidth: '100px',
    height: '70px',
    background: 'transparent',
    color: '#3cc0f3',
    fontSize: '25px',
    border: '1px solid #b3e5fc',
    padding: '0 20px',
    marginTop: '15px',
  },
  img: {
    width: '100%',
  },
  h2: {
    fontSize: '26px',
    margin: '15px 0',
  },
}));

const Empty = (props: IProps) => {
  const classes = useStyles();
  const { message } = props;
  return (
    <Box className={`${classes.root} ${props.size}`}>
      <img src={alert} width="55px" alt="logo" />
      <Typography variant="h2" component="h2" className={classes.h2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Empty;
