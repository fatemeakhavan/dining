import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, Toolbar, Typography } from '@material-ui/core';
import { useStyles } from 'Main/Styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ImageRepo from '../../Assets/img/repo.jpeg';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'Helpers/LogOut';
import { Link } from 'react-router-dom';
import { isClasorAdmin } from 'Helpers/Utils';
import { queryClient } from 'index';
import EditProfile from './EditProfile';
import { IUser } from '../../Interfaces/User.interface';
import useGetLocations from '../../Hooks/Locations/useGetLocations';
import { ILocation } from '../../Interfaces/Location.interface';
import mainifest from '../../mainifest';

interface IProps {
  handleDrawerOpen: () => void;
}

const Header = (props: IProps) => {
  const classes = useStyles();
  const [profileAncher, setProfileAncher] = React.useState<Element | null>(null);
  const [editProfile, setEditProfile] = useState<IUser | null>(null);

  const userInfo = queryClient.getQueryData<any>('userInfo');
  // const locationsListHook = useGetLocations();

  const closeProfile = () => {
    setProfileAncher(null);
  };

  function addDefaultSrc(ev: { target: { src: string } }) {
    ev.target.src = ImageRepo;
  }

  const openProfile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setProfileAncher(event.currentTarget);
  };

  const redirect = () => {
    window.location.replace(`https://panel.pod.ir/Users/Info?noLayout=true&redirectUri=${window.location.href}&mode=edit`);
  };

  let locationsList: ILocation[] = [];
  // if (locationsListHook.data?.length) {
  //   locationsList = locationsListHook.data;
  // }

  const onLogout = () => {
    logout();
  };
  return (
    <AppBar color="transparent" position="static">
      {userInfo && (
        <Toolbar className={classes.toolbar}>
          <Box flex="1">
            <Box display="flex" alignItems="center">
              <IconButton onClick={props.handleDrawerOpen} className={classes.toggleSideBar}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
          <Box flex="1" display="flex" justifyContent="flex-end">
            {isClasorAdmin() && (
              <Link to="/admin" className={classes.nonDecoarateLink}>
                <Button color="primary" variant="outlined">
                  {'مدیریت کلاسور'}
                </Button>
              </Link>
            )}
            <Button
              color="primary"
              startIcon={
                userInfo.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt="profile"
                    style={{
                      width: '38px',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <PermIdentityIcon />
                )
              }
              className={classes.profileBtn}
              onClick={openProfile}
              endIcon={<ExpandMoreIcon />}
            >
              {userInfo.username || 'پروفایل'}
            </Button>

            <Menu
              open={!!profileAncher}
              anchorEl={profileAncher}
              onClose={closeProfile}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              getContentAnchorEl={null}
              className={classes.profile}
            >
              <Box className={classes.profileMenu}>
                <Box className={classes.imageWrapper}>
                  <img
                    alt="user profile"
                    onError={() => addDefaultSrc}
                    src={userInfo && userInfo.avatar ? userInfo.avatar : ImageRepo}
                    className={classes.userImage}
                  />
                </Box>
                <Box padding="25px 0 16px 0">
                  <Typography component="h5" variant="h5">
                    <b>{userInfo && userInfo.firstName + ' ' + userInfo.lastName}</b>
                  </Typography>
                </Box>
                <Box marginBottom="15px" textAlign="center">
                  <Button onClick={() => setEditProfile(userInfo)}>اطلاعات کاربری</Button>
                </Box>
                <Box padding="0 0 10px 0" textAlign="center">
                  <Button fullWidth onClick={onLogout} className={classes.outBtn}>
                    <b>خروج از حساب کاربری</b>
                  </Button>
                </Box>
                <Typography component="small" className={classes.version}>
                  نسخه {mainifest.version}
                  {/*نسخه 0.0.13*/}
                </Typography>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      )}
      {editProfile ? <EditProfile user={userInfo} handleClose={() => setEditProfile(null)} /> : null}
    </AppBar>
  );
};

export default React.memo(Header);
