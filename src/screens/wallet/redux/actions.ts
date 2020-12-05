import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_TRANSFER_HISTORY_ACTION: (body, callback) => ({ body, callback }),
});
export const { getTransferHistoryAction } = actions;
