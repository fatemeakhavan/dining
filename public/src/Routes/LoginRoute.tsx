import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../Helpers/Auth';

interface IProps {
  component: React.FC;
  path: string[];
}

const LoginRoute: React.FC<IProps> = (props) => {
  const condition = isAuth();
  return !condition ? <Route path={[...props.path]} component={props.component} /> : <Redirect to="/" />;
};
export default LoginRoute;
