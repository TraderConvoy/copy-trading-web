import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserAmountAction, setAmountAction } from 'screens/dashboard/ducks/actions';
import { getAmountAvailable, getTransferHistory, transferAmount } from '../services';
import { getAmountAction, getTransferHistoryAction, setTransferHistoryAction, transferHistoryAction } from './actions';

function* getTransferHistoryWatcher() {
  yield takeLatest(getTransferHistoryAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const { body } = payload;
      const result = yield call(getTransferHistory, body);
      if (result) {
        yield put(setTransferHistoryAction(result.data[0]));
        if (payload.callback) payload.callback(result.data[0]);
      }
    } catch (error) {
      if (payload.callback) payload.callback(error, {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

function* transferHistoryWatcher() {
  yield takeLatest(transferHistoryAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const { body } = payload;
      const result = yield call(transferAmount, body);
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

function* getAmountAvailableWatcher() {
  yield takeLatest(getAmountAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const { body } = payload;
      const result = yield call(getAmountAvailable, body);
      if (result) {
        if (body.source === 'COPY_TRADE') {
          yield put(setAmountAction(result));
        } else {
          yield put(getUserAmountAction({ source: 'COPY_TRADE' }));
        }
        if (payload.callback) payload.callback(result);
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
  transferHistoryWatcher,
  getAmountAvailableWatcher,
};
