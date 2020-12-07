import { loadingOffAction, loadingOnAction } from 'containers/redux/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getLeaderDetail } from '../services';
import { getLeaderDetailAction, setLeaderDetailAction } from './actions';

function* getLeaderDetailWatcher() {
  yield takeLatest(getLeaderDetailAction, function* ({ payload }) {
    try {
      yield put(loadingOnAction());
      const result = yield call(getLeaderDetail, payload.body);
      if (result) {
        debugger;
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

export default {
  getLeaderDetailWatcher,
};
