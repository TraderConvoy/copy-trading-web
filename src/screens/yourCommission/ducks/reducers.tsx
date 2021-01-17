import { handleActions } from 'redux-actions';
import { setUserCommissionAction } from './actions';
const initialState = {
  commissionList: {
    data: [],
    count: 0,
    totalAmountWithdraw: 0,
    totalWithdraw: 0
  },
};
export default handleActions<any>(
  {
    [setUserCommissionAction.toString()]: (state, { payload }) => ({
      ...state,
      commissionList: { ...state.commissionList, ...payload },
    }),
  },
  initialState,
);
