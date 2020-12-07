import { handleActions } from 'redux-actions';
import { setLeaderDetailAction } from './actions';
const initialState = {
  expertDetail: [],
};
export default handleActions<any>(
  {
    [setLeaderDetailAction.toString()]: (state, { payload }) => ({
      ...state,
      expertDetail: payload,
    }),
  },
  initialState,
);
