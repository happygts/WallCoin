import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

function* fetchPageCoins({ payload, header }) {
    console.log("fetchPageCoins :", payload, header);
    try {
        const response = yield call(header.callback, payload.page);
        console.log("response :", response);
        yield put({ type: types.SUCCESS_FETCH_PAGE_COINS, payload : {
            coins: response.coins,
            pagination: response.pagination
        }});
    }
    catch (error) {
        yield put({ type: types.ERROR_FETCH_PAGE_COINS, error });
    }
}

function* coinsSaga() {
    yield takeEvery(types.START_FETCH_PAGE_COINS, fetchPageCoins);
}

export default coinsSaga;