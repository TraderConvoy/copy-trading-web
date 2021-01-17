import { createAction } from 'redux-actions';
import { IUser } from '../model';

/** login action */
export type LoginPayload = {
  body: any;
  callback: (error: any, result: any) => void;
};
export const loginAction = createAction<LoginPayload, any, (error: any, result: any) => void>(
  'LOGIN_ACTION',
  (body: any, callback: (error: any, result: any) => void) => ({ body, callback }),
);

/** set user infor action */
export type SetUserInforPayload = { user: IUser };
export const setUserInforAction = createAction<SetUserInforPayload, IUser>('SET_USER_INFO_ACTION', (user: IUser) => ({
  user,
}));
