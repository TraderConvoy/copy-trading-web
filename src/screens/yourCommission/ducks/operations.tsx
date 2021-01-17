// import { call, put, takeLatest } from '@redux-saga/core/effects';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserCommissionService } from '../services';
import { getUserCommissionAction, setUserCommissionAction } from './actions';
function* getUserCommissionWatcher() {
  yield takeLatest(getUserCommissionAction, function* ({ payload }) {
    try {
      // yield put(onLoadingAction());
      // yield put(logErrorAction(false, ''));
      const { body, callback } = payload;
      console.log(body, "body");
      const result = yield call(getUserCommissionService, body);
      if (result) {
        console.log(result, "result");
        yield put(setUserCommissionAction(result));
        if (callback) {
          yield call(callback(true));
        }
      }
    } catch (error) {
      // yield put(logErrorAction(true, ''));
    } finally {
      // yield put(offLoadingAction());
    }
  });
}

export default {
  getUserCommissionWatcher,
};
