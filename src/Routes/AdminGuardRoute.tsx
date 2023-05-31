import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../Helpers/Auth';
import { isClasorAdmin } from 'Helpers/Utils';
import Main from '../Main';

interface IProps {
  component: any;
  path: string[];
  exact: boolean;
  footer?: boolean;
  header?: boolean;
  sidebar?: boolean;
}

const AdminGuardRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  // we can check user condition here such as role and permission but for now we just check user is login or not
  const authCondition = isAuth();
  const AdminCondition = isClasorAdmin();
  return (
    <>
      {authCondition && AdminCondition ? (
        <Route
          {...rest}
          render={(routeProps) => (
            <Main sidebar={rest.sidebar} footer={rest.footer} header={rest.header}>
              <Component {...routeProps} />
            </Main>
          )}
        />
      ) : (
        <Redirect to="/auth" />
      )}
    </>
  );
};
export default AdminGuardRoute;
