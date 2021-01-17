import { handleActions } from 'redux-actions';
import { setTradingAmountAction, setTransferHistoryAction, setUserAmountAction } from './actions';
const initialState = {
  copyTradeAmount: {},
  tradingAmount: {},
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
    [setTradingAmountAction.toString()]: (state, { payload }) => ({
      ...state,
      tradingAmount: payload,
    }),
  },
  initialState,
);
