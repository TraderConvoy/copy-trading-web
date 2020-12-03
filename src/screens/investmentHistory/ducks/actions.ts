import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_LIST_TRADING_COPY_ACTION: (body, callback) => ({ body, callback }),
  RESUME_TRADING_COPY_ACTION: (body, callback) => ({ body, callback }),
  PAUSE_TRADING_COPY_ACTION: (body, callback) => ({ body, callback }),
  STOP_TRADING_COPY_ACTION: (body, callback) => ({ body, callback }),
});
export const {
  getListTradingCopyAction,
  resumeTradingCopyAction,
  pauseTradingCopyAction,
  stopTradingCopyAction,
} = actions;
