import { handleActions } from 'redux-actions';
import { setUserHistoryAction } from './actions';
const initialState = {
  historyList: [],
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
