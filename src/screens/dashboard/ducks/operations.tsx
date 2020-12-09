import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getAmountAvailable } from 'screens/wallet/services';
import {
  createTradingCopy,
  getDataExperts,
  getDataExpertsByUserName,
  getListTradingCopies,
  tranferAmountService,
} from '../services';
import {
  createTradingCopyAction,
  getListExpertsAction,
  getListExpertsByNameAction,
  getListTradingCopiesAction,
  getUserAmountAction,
  setAmountAction,
  setListExpertsAction,
  transferAmountAction,
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
function* transferAmountWatcher() {
  yield takeLatest(transferAmountAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(tranferAmountService, payload.body);
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

function* getAmountWatcher() {
  yield takeLatest(getUserAmountAction, function* ({ payload }) {
    try {
      const result = yield call(getAmountAvailable, payload.body);
      if (result) {
        yield put(setAmountAction(result));
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  });
}
function* getDataExpertsByNameWatcher() {
  yield takeLatest(getListExpertsByNameAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(getDataExpertsByUserName, payload.body);
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

export default {
  getDataExpertsWatcher,
  getListTradingCopiesWatcher,
  createTradingCopyWatcher,
  transferAmountWatcher,
  getAmountWatcher,
  getDataExpertsByNameWatcher,
};
