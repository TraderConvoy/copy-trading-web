import { createActions } from 'redux-actions';

const actions = createActions<any>({
  GET_LIST_EXPERTS_ACTION: (callback) => ({ callback }),
  SET_LIST_EXPERTS_ACTION: (data) => data,
});
export const { getListExpertsAction, setListExpertsAction } = actions;
