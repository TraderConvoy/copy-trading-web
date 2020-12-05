import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_USER_HISTORY_ACTION: (body, callback) => ({ body, callback }),
  SET_USER_HISTORY_ACTION: (data) => data,
});
export const { getUserHistoryAction, setUserHistoryAction } = actions;
