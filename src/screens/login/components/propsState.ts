import { TYPE_USER } from 'constant/common';

export interface IState {
  username: string;
  password: string;
  type: TYPE_USER;
}
