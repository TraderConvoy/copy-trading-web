import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getTransferHistory } from '../services';
import { getTransferHistoryAction } from './actions';

function* getTransferHistoryWatcher() {
  yield takeLatest(getTransferHistoryAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const { body } = payload;
      const result = yield call(getTransferHistory, body);
      if (result) {
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
  getTransferHistoryWatcher,
};
