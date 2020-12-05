import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_LEADER_DETAIL_ACTION: (body, callback) => ({ body, callback }),
});
export const { getLeaderDetailAction } = actions;
