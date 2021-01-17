import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_USER_COMMISSION_ACTION: (body, callback) => ({ body, callback }),
  SET_USER_COMMISSION_ACTION: (data) => data,
});
export const { getUserCommissionAction, setUserCommissionAction } = actions;
