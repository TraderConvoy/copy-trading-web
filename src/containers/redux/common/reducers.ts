import { handleActions } from 'redux-actions';
import { loadingOffAction, loadingOnAction } from './actions';

const initialState = {
  loading: false,
};
export default handleActions<any>(
  {
    [loadingOnAction.toString()]: (state) => ({ ...state, loading: true }),
    [loadingOffAction.toString()]: (state) => ({ ...state, loading: false }),
  },
  initialState,
);
