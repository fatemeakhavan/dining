import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { CourseIcon } from '../../Assets/Svg';

interface IProps {
  isAdmin: boolean;
  isMonitoring: boolean;
}

export const MainListItems = (props: IProps) => {
  const activeRoute = window.location.pathname;
  const { isAdmin, isMonitoring } = props;
  return (
    <>
      {isAdmin ? (
        <React.Fragment>
          <ListItem button component={Link} to="/locations" selected={activeRoute === '/locations'}>
            <ListItemIcon>
              <CourseIcon viewBox="0 0 350 350" />
            </ListItemIcon>
            <ListItemText primary="شعبه ها" />
          </ListItem>
          <ListItem button component={Link} to="/restaurant" selected={activeRoute === '/service-reports'}>
            <ListItemIcon>
              <CourseIcon viewBox="0 0 350 350" />
            </ListItemIcon>
            <ListItemText primary="رستوران ها" />
          </ListItem>
          <ListItem button component={Link} to="/beverages" selected={activeRoute === '/beverages'}>
            <ListItemIcon>
              <CourseIcon viewBox="0 0 350 350" />
            </ListItemIcon>
            <ListItemText primary="نوشیدنی ها" />
          </ListItem>
          <ListItem button component={Link} to="/foods" selected={activeRoute === '/foods'}>
            <ListItemIcon>
              <CourseIcon viewBox="0 0 350 350" />
            </ListItemIcon>
            <ListItemText primary="غذا ها" />
          </ListItem>
          <ListItem button component={Link} to="/user" selected={activeRoute === '/user'}>
            <ListItemIcon>
              <CourseIcon viewBox="0 0 350 350" />
            </ListItemIcon>
            <ListItemText primary="کاربران" />
          </ListItem>
          <ListItem button component={Link} to="/meals" selected={activeRoute === '/meals'}>
            <ListItemIcon>
              <CourseIcon viewBox="0 0 350 350" />
            </ListItemIcon>
            <ListItemText primary="تاریخ ها" />
          </ListItem>
        </React.Fragment>
      ) : null}
      <ListItem button component={Link} to="/reserves" selected={activeRoute === '/reserves'}>
        <ListItemIcon>
          <CourseIcon viewBox="0 0 350 350" />
        </ListItemIcon>
        <ListItemText primary="رزرو غذا" />
      </ListItem>
      <ListItem button component={Link} to="/qrcode" selected={activeRoute === '/qrcode'}>
        <ListItemIcon>
          <CourseIcon viewBox="0 0 350 350" />
        </ListItemIcon>
        <ListItemText primary="دریافت کد" />
      </ListItem>
      {/*<ListItem button component={Link} to="/snack" selected={activeRoute === '/snack'}>*/}
      {/*  <ListItemIcon>*/}
      {/*    <CourseIcon viewBox="0 0 350 350" />*/}
      {/*  </ListItemIcon>*/}
      {/*  <ListItemText primary="رزرو میان وعده" />*/}
      {/*</ListItem>*/}
      {/*{isMonitoring ? (*/}
      {/*  <ListItem button component={Link} to="/dinner" selected={activeRoute === '/dinner'}>*/}
      {/*    <ListItemIcon>*/}
      {/*      <CourseIcon viewBox="0 0 350 350" />*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary="رزرو شام" />*/}
      {/*  </ListItem>*/}
      {/*) : null}*/}
    </>
  );
};
