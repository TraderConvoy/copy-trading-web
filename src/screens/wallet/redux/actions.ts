import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_TRANSFER_HISTORY_ACTION: (body, callback) => ({ body, callback }),
  GET_AMOUNT_ACTION: (body, callback) => ({ body, callback }),
  GET_WALLET_AMOUNT_ACTION: (body, callback) => ({ body, callback }),
  TRANSFER_HISTORY_ACTION: (body, callback) => ({ body, callback }),
  SET_TRANSFER_HISTORY_ACTION: (data) => ({ data }),
  SET_USER_AMOUNT_ACTION: (data) => ({ data }),
  SET_TRADING_AMOUNT_ACTION: (data) => ({ data }),
});
export const {
  getTransferHistoryAction,
  transferHistoryAction,
  setTransferHistoryAction,
  getAmountAction,
  getWalletAmountAction,
  setUserAmountAction,
  setTradingAmountAction,
} = actions;
