import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { Box, Typography } from '@material-ui/core';
import { MainListItems } from './Components/Menu';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useStyles } from './Styles';
import Header from './Components/Header';
import logo from '../Assets/img/logo.png';
import useGetUserInfo from '../Hooks/Main/useGetUserInfo';
import useGetUserGroups from '../Hooks/UserGroups/useGetUserGroups';
import mainifest from '../mainifest';
import UpdateVersion from './Components/UpdateVersion';
import { IUserInfo } from '../Interfaces/Users.interface';
import { IUser } from '../Interfaces/User.interface';

interface IProps {
  children: any;
  history: any;
  footer?: boolean;
  header?: boolean;
  sidebar?: boolean;
}
const Index = (props: IProps & RouteComponentProps) => {
  const userInfoResult = useGetUserInfo();
  const userGroupsResult = useGetUserGroups();
  const [showComponent, setShowComponent] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(true);
  if (userInfoResult && userInfoResult.data?.username && userInfoResult.data?.location?.id) {
    localStorage.setItem('ADMIN_PANEL:USERNAME', userInfoResult.data?.username.toString());
    localStorage.setItem('DEFAULT_LOCATION:LOC', userInfoResult.data?.location.id.toString());
  }

  const classes = useStyles();
  const { children } = props;
  // @ts-ignore
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  let userInfo: IUser = {
    appVersionLastSeen: '',
    avatar: '',
    email: '',
    firstName: '',
    lastName: '',
    ssoId: 0,
    username: '',
  };
  useEffect(() => {
    if (userGroupsResult?.data) {
      setIsAdmin(!!userGroupsResult?.data?.find((res: any) => res.name === 'FANAP_DINING_ADMIN'));
      setIsMonitoring(!!userGroupsResult?.data?.find((res: any) => res.name === 'FANAP_DINING_USER_MONITORING'));
    }
  }, [userGroupsResult?.data]);

  const checkVersion = () => {
    let serverVersion = '';
    const version = mainifest.version.split('.');
    if (userInfo.appVersionLastSeen) {
      serverVersion = userInfoResult.data?.appVersionLastSeen.split('.');

      for (let i = 0; i < version.length; i++) {
        console.log(+serverVersion[i], +version[i]);

        if (+serverVersion[i] < +version[i]) {
          setShowComponent(true);
          return;
        }
      }
    } else if (userInfoResult.data?.appVersionLastSeen === null) {
      setShowComponent(true);
    }
  };
  if (userInfoResult.data) {
    userInfo = userInfoResult.data;
  }
  useEffect(() => {
    checkVersion();
  }, [userInfo]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleDialog = () => setShowDialog(!showDialog);

  const handleCloseUpdate = () => setUpdateOpen(false);

  // if (userInfoResult.isError || repositoriesResult.isError || userGroupHashResult.isError || newsGroupHashResult.isError) {
  //   const status = (userInfoResult.error as any)?.response?.data?.status;
  //   if (status === 403) {
  //     // logout();
  //   }
  //   return (
  //     <Grid lg={12} xs={12} item>
  //       <Paper elevation={0} className={classes.paper}>
  //         <Box minHeight="calc(100vh - 35px)" position="relative" height="450px">
  //           <Empty message="خطا در دریافت اطلاعات کاربری" />
  //         </Box>
  //       </Paper>
  //     </Grid>
  //   );
  // }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        {open ? <Box className={classes.drawerToggle} onClick={handleDrawerClose}></Box> : null}
        <Drawer
          variant="permanent"
          classes={{
            root: 'main-menu',
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
          hidden={props.sidebar === false}
        >
          <Box className={classes.logoWrapper}>
            <img src={logo} width="220px" alt="Sakku-logo" />
          </Box>
          <List>
            <MainListItems isMonitoring={isMonitoring} isAdmin={isAdmin} handleClick={handleDrawerClose} />
          </List>
        </Drawer>
        <main className={classes.content}>
          <Header handleDrawerOpen={handleDrawerOpen} />
          <Container maxWidth="lg" className={classes.container}>
            {/*{userInfoResult.isLoading || !repositoriesResult.data || !userGroupHashResult.data ? <Spinner /> : <>{children}</>}*/}
            {<>{children}</>}
          </Container>
          <footer className={classes.footer}>
            <Typography component="h5">
              <span>Dining Panel</span> (پنل رزرو غذا)
              <br />
              <span>SAKKU</span> قدرت گرفته توسط
            </Typography>
          </footer>
        </main>
      </div>
      {showComponent && <UpdateVersion handleClose={handleCloseUpdate} open={updateOpen} user={userInfo} />}
    </>
  );
};
export default withRouter(Index);
