// import { call, put, takeLatest } from '@redux-saga/core/effects';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserHistoryService } from '../services';
import { getUserHistoryAction, setUserHistoryAction } from './actions';
function* getUserHistoryWatcher() {
  yield takeLatest(getUserHistoryAction, function* ({ payload }) {
    try {
      // yield put(onLoadingAction());
      // yield put(logErrorAction(false, ''));
      const { body, callback } = payload;
      const result = yield call(getUserHistoryService, body);
      if (result) {
        yield put(setUserHistoryAction(result));
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
  getUserHistoryWatcher,
};
