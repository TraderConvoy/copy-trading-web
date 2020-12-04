import { combineReducers } from 'redux';
import userInfo from './login/ducks/reducers';
import userHistory from './yourHistory/ducks/reducers';
export default combineReducers({
  userHistory,
  userInfo,
});
