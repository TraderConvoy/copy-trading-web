import system from 'constant/localstore';
import React from 'react';
import { Translation } from 'react-i18next';
import { Redirect, Route } from 'react-router-dom';
import CustomerLayout from './CustomerLayout';
/*const CustomerLayoutRoute = ({ component: Component, activeSidebar = '', ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <Translation>
        {(t, { i18n }) => (
          <CustomerLayout {...matchProps} activeSidebar={activeSidebar}>
            <Component {...matchProps} t={t} i18n={i18n} />
          </CustomerLayout>
        )}
      </Translation>
    )}
  />
); */

const CustomerLayoutRoute = ({ component: Component, activeSidebar = '', ...rest }) => {
  const isHaveToken = localStorage.getItem(system.TOKEN);
  if (!isHaveToken) {
    return <Redirect to={`/copy-trading/login`} />;
  }
  if (rest && rest.path === '/copy-trading/login') {
    return <Redirect to={`/copy-trading`} />;
  }
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Translation>
          {(t, { i18n }) => (
            <CustomerLayout {...matchProps} activeSidebar={activeSidebar}>
              <Component {...matchProps} t={t} i18n={i18n} />
            </CustomerLayout>
          )}
        </Translation>
      )}
    />
  );
};

export default CustomerLayoutRoute;
