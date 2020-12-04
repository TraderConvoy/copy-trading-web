import system from 'constant/localstore';
import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginActionService } from '../services';
import { logInAction, setUserInfoAction } from './actions';
function* LogInActionWatcher() {
  yield takeLatest(logInAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const { body } = payload;
      const result = yield call(loginActionService, body);
      if (result) {
        yield put(setUserInfoAction(result));
        localStorage.setItem(system.TOKEN, result.access_token);
        if (payload.callback) payload.callback(null, result);
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
