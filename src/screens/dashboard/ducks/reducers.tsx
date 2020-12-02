import { handleActions } from 'redux-actions';
import { setListExpertsAction } from './actions';
const initialState = {
  experts: [],
};
export default handleActions<any>(
  {
    [setListExpertsAction.toString()]: (state, { payload }) => ({
      ...state,
      experts: payload,
    }),
  },
  initialState,
);
