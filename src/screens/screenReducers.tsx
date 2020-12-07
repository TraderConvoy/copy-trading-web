import { combineReducers } from 'redux';
import dashBoard from './dashboard/ducks/reducers';
import leaderDetail from './leaderDetail/redux/reducers';
import userInfo from './login/redux/reducers';
import userHistory from './yourHistory/ducks/reducers';
export default combineReducers({
  userHistory,
  userInfo,
  dashBoard,
  leaderDetail,
});
