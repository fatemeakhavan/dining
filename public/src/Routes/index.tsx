import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import GuardRoute from './GuardRoute';
import LoginRoute from './LoginRoute';
//Pages
import SigninComponent from '../Pages/Signin';
import NotFoundComponent from '../Pages/NotFound';
import LocationsComponent from '../Pages/Locations';
import BeveragesComponent from '../Pages/Beverages';
import FoodsComponent from '../Pages/Foods';
import MealsComponent from '../Pages/Meals';
import ReservesComponent from '../Pages/reserve';
import ServicesComponent from '../Pages/Services';
import ServiceJenkinsActions from '../Pages/Services/Components/ServiceJenkinsActions';
import ServiceResourcePlans from '../Pages/Services/Components/RecourcePlan/ServiceResorcePlans';
import ServiceReports from '../Pages/Services/Components/Report/ServiceReports';
import UserComponent from '../Pages/Users';
import QrcodeComponent from '../Pages/QrCode/QrcodeComponent';
import RestaurantComponent from '../Pages/Restaurants';

const Index: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <Switch>
        <LoginRoute path={['/auth']} component={SigninComponent} />
        <GuardRoute exact={true} path={['/', '/reserves']} component={ReservesComponent} />
        <GuardRoute exact path={['/locations']} component={LocationsComponent} />
        <GuardRoute exact path={['/beverages']} component={BeveragesComponent} />
        <GuardRoute exact path={['/foods']} component={FoodsComponent} />
        <GuardRoute exact path={['/meals']} component={MealsComponent} />
        <GuardRoute exact path={['/reserves']} component={ReservesComponent} />
        <GuardRoute exact path={['/user']} component={UserComponent} />
        <GuardRoute exact path={['/service-groups/:id/services']} component={ServicesComponent} />
        <GuardRoute exact path={['/service-groups/:id/services/:id/actions']} component={ServiceJenkinsActions} />
        <GuardRoute exact path={['/service-groups/:id/services/:id/plans']} component={ServiceResourcePlans} />
        <GuardRoute exact path={['/service-groups/:id/services/:id/reports']} component={ServiceReports} />
        <GuardRoute exact={true} path={['/qrcode']} component={QrcodeComponent} />
        <GuardRoute exact path={['/restaurant']} component={RestaurantComponent} />
        <GuardRoute exact path={['*']} component={NotFoundComponent} />


      </Switch>
    </Router>
  );
};

export default Index;
