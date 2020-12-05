import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getListTradingCopies, pauseTradingCopy, resumeTradingCopy, stopTradingCopy } from '../services';
import {
  getListTradingCopyAction,
  pauseTradingCopyAction,
  resumeTradingCopyAction,
  stopTradingCopyAction,
} from './actions';

function* getListTradingCopyWatcher() {
  yield takeLatest(getListTradingCopyAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(getListTradingCopies, payload.body);
      if (result) {
        if (payload.callback) payload.callback('', result);
      }
    } catch (error) {
      if (payload.callback) payload.callback(error, {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

function* resumeTradingCopyWatcher() {
  yield takeLatest(resumeTradingCopyAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(resumeTradingCopy, payload.body);
      if (result) {
        if (payload.callback) payload.callback('', result);
      }
    } catch (error) {
      if (payload.callback) payload.callback(error, {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

function* pauseTradingCopyWatcher() {
  yield takeLatest(pauseTradingCopyAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(pauseTradingCopy, payload.body);
      if (result) {
        if (payload.callback) payload.callback('', result);
      }
    } catch (error) {
      if (payload.callback) payload.callback(error, {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

function* stopTradingCopyWatcher() {
  yield takeLatest(stopTradingCopyAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(stopTradingCopy, payload.body);
      if (result) {
        if (payload.callback) payload.callback('', result);
      }
    } catch (error) {
      if (payload.callback) payload.callback('Server Error', {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

export default {
  getListTradingCopyWatcher,
  pauseTradingCopyWatcher,
  stopTradingCopyWatcher,
  resumeTradingCopyWatcher,
};
