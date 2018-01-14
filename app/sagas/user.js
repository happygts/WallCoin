import { delay } from 'redux-saga'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import * as types from '../actions/types'
import { Api } from '../api/api';
import * as actions from '../actions'

// Our worker Saga: will perform the async increment task
function* login({ payload }) {
    try {
        const response = yield call(Api.login, payload.email, payload.password);
        yield delay(1000)
        yield put({ type: types.SUCCESS_LOGIN });
        yield put({ type: types.INIT_STATE_USER })
    }
    catch (error) {
        yield delay(1000)
        yield put({ type: types.ERROR_LOGIN, error });
    }
}

function* whoAmI({ payload }) {
    try {
        const response = yield call(Api.login, payload.email, payload.password);

        yield put({
            type: types.SUCCESS_WHO_AM_I, payload: {

            }
        });
    }
    catch (error) {
        yield put({ type: types.ERROR_WHO_AM_I, error });
    }
}

function* initStateUser() {
    // const userSelector = yield select(header.userSelector);
    // const storeSelector = yield select(header.storeSelector);

    // actions.initCoins();
    // actions.initPortfolios();
}

// Our watcher Saga: spawn a new login task on each START_LOGIN
function* userSaga() {
    yield takeEvery(types.START_LOGIN, login);
    yield takeEvery(types.INIT_STATE_USER, initStateUser);
    yield takeEvery(types.START_WHO_AM_I, whoAmI);
}

export default userSaga;