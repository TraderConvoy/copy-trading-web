import system from 'constant/localstore';
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
const ExpertManagement = lazy(() => import('screens/expertManagement'));
const InvestmentCalculator = lazy(() => import('screens/investmentCalculator'));
const LeaderDetail = lazy(() => import('screens/leaderDetail'));
const Wallet = lazy(() => import('screens/wallet'));
const Login = lazy(() => import('screens/login'));

const RouterConfig = () => {
  const isHaveToken = localStorage.getItem(system.TOKEN);
  return (
    <Switch>
      {/* {!isHaveToken ? (
        <Route exact={true} render={() => <Redirect to="/copy-trading/login" />} component={Login} />
      ) : null} */}
      <Redirect exact={true} from="/copy-trading" to="/copy-trading/top-leaders" />
      <Route path="/copy-trading/login" component={Login} />
      <CustomerLayoutRoute
        path="/copy-trading/top-leaders"
        activeSidebar={ACTIVE_SIDEBAR.TOP_LEADER}
        component={Dashboard}
      />
      <CustomerLayoutRoute
        path="/copy-trading/leader-detail/:leaderID"
        activeSidebar={ACTIVE_SIDEBAR.TOP_LEADER}
        component={LeaderDetail}
      />
      <CustomerLayoutRoute
        path="/copy-trading/your-history"
        activeSidebar={ACTIVE_SIDEBAR.YOUR_HISTORY}
        component={YourHistory}
      />
      <CustomerLayoutRoute
        path="/copy-trading/become-an-expert"
        activeSidebar={ACTIVE_SIDEBAR.BECOME_AN_EXPERT}
        component={BecomeAnExpert}
      />
      <CustomerLayoutRoute
        path="/copy-trading/investment-calculator"
        activeSidebar={ACTIVE_SIDEBAR.INVESTMENT_CALCULATOR}
        component={InvestmentCalculator}
      />
      <CustomerLayoutRoute
        path="/copy-trading/investment-history"
        activeSidebar={ACTIVE_SIDEBAR.INVESTMENT_HISTORY}
        component={InvestmentHistory}
      />
      <CustomerLayoutRoute
        path="/copy-trading/expert-management"
        activeSidebar={ACTIVE_SIDEBAR.EXPERT_MANAGEMENT}
        component={ExpertManagement}
      />
      <CustomerLayoutRoute path="/copy-trading/wallet" activeSidebar={ACTIVE_SIDEBAR.WALLET} component={Wallet} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(RouterConfig);
