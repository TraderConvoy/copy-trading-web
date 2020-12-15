import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getLeaderDetail, getLeaderHistory } from '../services';
import {
  getLeaderDetailAction,
  getLeaderHistoryAction,
  setLeaderDetailAction,
  setLeaderHistoryAction,
} from './actions';

function* getLeaderDetailWatcher() {
  yield takeLatest(getLeaderDetailAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(getLeaderDetail, payload.body);
      if (result) {
        yield put(setLeaderDetailAction(result.data));
        if (payload.callback) payload.callback(null, result);
      }
    } catch (error) {
      if (payload.callback) payload.callback(error, {});
    } finally {
      yield put(loadingOffAction());
    }
  });
}

function* getLeaderHistoryWatcher() {
  yield takeLatest(getLeaderHistoryAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(getLeaderHistory, payload.body);
      if (result) {
        yield put(setLeaderHistoryAction(result));
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
  getLeaderDetailWatcher,
  getLeaderHistoryWatcher,
};
