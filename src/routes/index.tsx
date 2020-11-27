import { ACTIVE_SIDEBAR } from 'constant/sidebar';
import CustomerLayoutRoute from 'containers/layout';
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';

/** not found */
const NotFound = lazy(() => import('containers/exception/404'));

// const Home = lazy(() => import('screens/home'));
const Dashboard = lazy(() => import('screens/dashboard'));
const BecomeAnExpert = lazy(() => import('screens/becomeAnExpert'));
const InvestmentHistory = lazy(() => import('screens/investmentHistory'));
const YourHistory = lazy(() => import('screens/yourHistory'));

const RouterConfig = () => {
  return (
    <Switch>
      {process.env.NODE_ENV === 'development' ? (
        <Route exact={true} path="/" render={() => <Redirect to="/copy-trading" />} />
      ) : null}
      {/* <CustomerLayoutRoute exact={true} path="/copy-trading" component={Home} /> */}
      <CustomerLayoutRoute
        exact={true}
        path="/copy-trading"
        activeSidebar={ACTIVE_SIDEBAR.TOP_LEADER}
        component={Dashboard}
      />
      <CustomerLayoutRoute
        exact={true}
        path="/copy-trading/your-history"
        activeSidebar={ACTIVE_SIDEBAR.YOUR_HISTORY}
        component={YourHistory}
      />
      <CustomerLayoutRoute
        exact={true}
        path="/copy-trading/become-an-expert"
        activeSidebar={ACTIVE_SIDEBAR.BECOME_AN_EXPERT}
        component={BecomeAnExpert}
      />
      <CustomerLayoutRoute
        exact={true}
        path="/copy-trading/investment-history"
        activeSidebar={ACTIVE_SIDEBAR.INVESTMENT_HISTORY}
        component={InvestmentHistory}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(RouterConfig);
