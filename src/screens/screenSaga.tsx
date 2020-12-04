// import commonSaga from '../containers/redux/operations';
import dashboardSaga from 'screens/dashboard/ducks/operations';
import investmentHistorySaga from 'screens/investmentHistory/ducks/operations';
import leaderDetailSaga from 'screens/leaderDetail/redux/operations';
import userHistorySaga from '../screens/yourHistory/ducks/operations';

export default {
  // ...commonSaga,
  ...dashboardSaga,
  ...userHistorySaga,
  ...investmentHistorySaga,
  ...leaderDetailSaga,
};
