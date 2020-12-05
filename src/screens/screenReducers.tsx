import { combineReducers } from 'redux';
import userInfo from './login/redux/reducers';
import userHistory from './yourHistory/ducks/reducers';
export default combineReducers({
  userHistory,
  userInfo,
});
