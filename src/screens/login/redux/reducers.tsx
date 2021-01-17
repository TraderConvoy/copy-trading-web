import { Action, handleActions } from 'redux-actions';
import { SetUserInforPayload } from './actions';
import { ActionState } from './state';

type CombinedPayloads = SetUserInforPayload;
export default handleActions<ActionState, CombinedPayloads>(
  {
    SET_USER_INFO_ACTION: (state, { payload }: Action<SetUserInforPayload>): ActionState => ({
      ...state,
      userInfor: payload.user,
    }),
  },
  {
    userInfor: null,
  },
);
