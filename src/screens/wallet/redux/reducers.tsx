import { handleActions } from 'redux-actions';
import { setTransferHistoryAction, setUserAmountAction } from './actions';
const initialState = {
  copyTradeAmount: {},
  walletHistory: [],
};
export default handleActions<any>(
  {
    [setTransferHistoryAction.toString()]: (state, { payload }) => ({
      ...state,
      walletHistory: payload,
    }),
    [setUserAmountAction.toString()]: (state, { payload }) => ({
      ...state,
      copyTradeAmount: payload,
    }),
  },
  initialState,
);
