import { handleActions } from 'redux-actions';
import { setAmountAction, setListExpertsAction } from './actions';
const initialState = {
  experts: [],
  userAmount: {},
};
export default handleActions<any>(
  {
    [setListExpertsAction.toString()]: (state, { payload }) => ({
      ...state,
      experts: payload,
    }),
    [setAmountAction.toString()]: (state, { payload }) => ({
      ...state,
      userAmount: payload,
    }),
  },
  initialState,
);
