import { createActions } from 'redux-actions';

const actions = createActions<any>({
  LOADING_ON_ACTION: () => null,
  LOADING_OFF_ACTION: () => null,
});
export const { loadingOnAction, loadingOffAction } = actions;
