import { ACTIVE_SIDEBAR } from 'constant/sidebar';
import CustomerLayoutRoute from 'containers/layout';
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';

/** not found */
const NotFound = lazy(() => import('containers/exception/404'));

const Home = lazy(() => import('screens/home'));
const TopLeader = lazy(() => import('screens/topLeader'));

const RouterConfig = () => {
  return (
    <Switch>
      {process.env.NODE_ENV === 'development' ? (
        <Route exact={true} path="/" render={() => <Redirect to="/copy-trading" />} />
      ) : null}
      <CustomerLayoutRoute exact={true} path="/copy-trading" component={Home} />
      <CustomerLayoutRoute
        exact={true}
        path="/copy-trading/top-leader"
        activeSidebar={ACTIVE_SIDEBAR.TOP_LEADER}
        component={TopLeader}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(RouterConfig);
