import { handleActions } from 'redux-actions';
import { setUserHistoryAction } from './actions';
const initialState = {
  historyList: {
    data: [],
    count: 0,
    profit: [],
  },
};
export default handleActions<any>(
  {
    [setUserHistoryAction.toString()]: (state, { payload }) => ({
      ...state,
      historyList: payload,
    }),
  },
  initialState,
);
