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
      if (payload.callback) payload.callback('Server Error', {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

function* resumeTradingCopyWatcher() {
  yield takeLatest(resumeTradingCopyAction, function* ({ payload }) {
    try {
      // yield put(onLoadingAction());
      // yield put(logErrorAction(false, ''));
      const result = yield call(resumeTradingCopy, payload.body);
      if (result) {
        if (payload.callback) payload.callback('', result);
      }
    } catch (error) {
      if (payload.callback) payload.callback('Server Error', {});
      // yield put(logErrorAction(true, ''));
    } finally {
      // yield put(offLoadingAction());
    }
  });
}

function* pauseTradingCopyWatcher() {
  yield takeLatest(pauseTradingCopyAction, function* ({ payload }) {
    try {
      // yield put(onLoadingAction());
      // yield put(logErrorAction(false, ''));
      const result = yield call(pauseTradingCopy, payload.body);
      if (result) {
        if (payload.callback) payload.callback('', result);
      }
    } catch (error) {
      if (payload.callback) payload.callback('Server Error', {});
      // yield put(logErrorAction(true, ''));
    } finally {
      // yield put(offLoadingAction());
    }
  });
}

function* stopTradingCopyWatcher() {
  yield takeLatest(stopTradingCopyAction, function* ({ payload }) {
    try {
      // yield put(onLoadingAction());
      // yield put(logErrorAction(false, ''));
      const result = yield call(stopTradingCopy, payload.body);
      if (result) {
        if (payload.callback) payload.callback('', result);
      }
    } catch (error) {
      if (payload.callback) payload.callback('Server Error', {});
      // yield put(logErrorAction(true, ''));
    } finally {
      // yield put(offLoadingAction());
    }
  });
}

export default {
  getListTradingCopyWatcher,
  pauseTradingCopyWatcher,
  stopTradingCopyWatcher,
  resumeTradingCopyWatcher,
};
