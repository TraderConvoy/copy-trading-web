import system from 'constant/localstore';
import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserById, loginActionService } from '../services';
import { loginAction, setUserInforAction } from './actions';

function* LogInActionWatcher() {
  yield takeLatest(loginAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const { body } = payload;
      const result = yield call(loginActionService, body);
      if (result) {
        localStorage.setItem(system.TOKEN, result.access_token);
        const userInfor = yield call(getUserById);
        if (userInfor.data) {
          yield put(setUserInforAction(userInfor.data));
          if (payload.callback) payload.callback(null, userInfor.data);
        } else {
          if (payload.callback) payload.callback(null, null);
        }
      }
    } catch (error) {
      if (payload.callback) payload.callback(error, {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

export default {
  LogInActionWatcher,
};
