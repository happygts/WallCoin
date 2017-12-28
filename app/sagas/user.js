import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

// Our worker Saga: will perform the async increment task
function* login({ payload }) {
    try {
        const response = yield call(Api.login, payload.email, payload.password);
        yield delay(1000)
        yield put({ type: types.SUCCESS_LOGIN });
    }
    catch (error) {
        yield delay(1000)
        yield put({ type: types.ERROR_LOGIN, error });
    }
}

function* test() {
    yield delay(1000)
}

// Our watcher Saga: spawn a new login task on each START_LOGIN
function* userSaga() {
    yield takeEvery(types.START_LOGIN, login)
}

export default userSaga;