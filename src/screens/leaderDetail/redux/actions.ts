import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_LEADER_DETAIL_ACTION: (body, callback) => ({ body, callback }),
  SET_LEADER_DETAIL_ACTION: (data) => ({ data }),
});
export const { getLeaderDetailAction, setLeaderDetailAction } = actions;
