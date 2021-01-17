import { handleActions } from 'redux-actions';
import { setLeaderDetailAction, setLeaderHistoryAction } from './actions';
const initialState = {
  expertDetail: [],
  leaderHistory: [],
};
export default handleActions<any>(
  {
    [setLeaderDetailAction.toString()]: (state, { payload }) => ({
      ...state,
      expertDetail: payload,
    }),
    [setLeaderHistoryAction.toString()]: (state, { payload }) => ({
      ...state,
      leaderHistory: payload,
    }),
  },
  initialState,
);
