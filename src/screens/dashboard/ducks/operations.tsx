import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createTradingCopy, getDataExperts, getListTradingCopies } from '../services';
import {
  createTradingCopyAction,
  getListExpertsAction,
  getListTradingCopiesAction,
  setListExpertsAction,
} from './actions';

function* getDataExpertsWatcher() {
  yield takeLatest(getListExpertsAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(getDataExperts, payload.body);
      if (result) {
        yield put(setListExpertsAction(result.data));
        if (payload.callback) payload.callback(null, result);
      }
    } catch (error) {
      if (payload.callback) payload.callback(error, {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

function* getListTradingCopiesWatcher() {
  yield takeLatest(getListTradingCopiesAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(getListTradingCopies, payload.body);
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

function* createTradingCopyWatcher() {
  yield takeLatest(createTradingCopyAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(createTradingCopy, payload.body);
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
  getDataExpertsWatcher,
  getListTradingCopiesWatcher,
  createTradingCopyWatcher,
};
