// import { call, put, takeLatest } from '@redux-saga/core/effects';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getDataExperts } from '../services';
import { getListExpertsAction, setListExpertsAction } from './actions';
function* getDataExpertsWatcher() {
  yield takeLatest(getListExpertsAction, function* ({ payload }) {
    try {
      // yield put(onLoadingAction());
      // yield put(logErrorAction(false, ''));
      const { callback } = payload;
      const result = yield call(getDataExperts);
      if (result) {
        yield put(setListExpertsAction(result.data));
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
  getDataExpertsWatcher,
};
