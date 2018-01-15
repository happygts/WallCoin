import { delay } from 'redux-saga'
import { put, takeEvery, call, select, take, cancel } from 'redux-saga/effects'
import * as types from '../actions/types'
import { Api } from '../api/api';
import * as actions from '../actions'

// Our worker Saga: will perform the async increment task
function* login({ payload: { email, password } }) {
    try {
        const response = yield call(Api.login, email, password);
        console.log("response :", response);
        yield delay(1000);
        yield put({
            type: types.SUCCESS_LOGIN,
            payload: {
                userId: response.id,
                email: response.email,
                status: response.status
            }
        });
    }
    catch (error) {
        yield delay(1000)
        yield put({ type: types.ERROR_LOGIN, error });
    }
}

function* logout() {
    console.log("LOGOUT");
}

function* initStateAppWithUserId(userId) {
    yield put(actions.ActionCreators.fetchListDataCoins());
}

// Our watcher Saga: spawn a new login task on each START_LOGIN
export const userSaga = function* userSaga() {
    yield takeEvery(types.START_LOGIN, login);
    yield takeEvery(types.START_LOGOUT, logout)
}

export const successLoginFlow = function* successLoginFlow() {
    while (true) {
        const { payload: { userId } } = yield take('SUCCESS_LOGIN');

        yield initStateAppWithUserId(userId);

        const action = yield take('SUCCESS_LIST_DATA');
        //yield put(actions.ActionCreators.fetchListDataPortfolios());

        console.log("success load all ressources");        
    }
}