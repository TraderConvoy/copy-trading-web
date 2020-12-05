import { createActions } from 'redux-actions';

const actions = createActions<any>({
  LOG_IN_ACTION: (body, callback) => ({ body, callback }),
  SET_USER_INFO_ACTION: (data) => data,
});
export const { logInAction, setUserInfoAction } = actions;
