import { handleActions } from 'redux-actions';
import { setUserInfoAction } from './actions';
const initialState = {
  user: [],
};
export default handleActions<any>(
  {
    [setUserInfoAction.toString()]: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
  },
  initialState,
);
