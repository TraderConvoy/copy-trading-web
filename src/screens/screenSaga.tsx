// import commonSaga from '../containers/redux/operations';
import dashboardSaga from 'screens/dashboard/ducks/operations';
import investmentHistorySaga from 'screens/investmentHistory/ducks/operations';
import leaderDetailSaga from 'screens/leaderDetail/redux/operations';
import walletSaga from 'screens/wallet/redux/operations';
import userHistorySaga from '../screens/yourHistory/ducks/operations';
import loginSaga from './login/redux/operations';

export default {
  // ...commonSaga,
  ...dashboardSaga,
  ...userHistorySaga,
  ...investmentHistorySaga,
  ...leaderDetailSaga,
  ...loginSaga,
  ...walletSaga,
};
