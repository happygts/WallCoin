import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

import { coinsPaginationSelector, coinsSelector, storeSelector } from '../selectors/sagaStateSelectors'

function* fetchNextPageCoins({ header }) {
    const pagination = yield select(coinsPaginationSelector);

    if (!pagination.current || pagination.current * pagination.size < pagination.totalItems) {
        try {
            const response = yield call(header.callback, pagination.current >= 0 ? pagination.current + 1 : 0);

            yield put({
                type: types.SUCCESS_FETCH_NEXT_PAGE_COINS,
                payload: {
                    coins: response.coins,
                    pagination: response.pagination
                }
            });
            yield put({
                type: types.UPDATE_STORE, payload: {
                    toUpdate: 'coins',
                    data: response.coins
                }
            });
        }
        catch (error) {
            yield put({ type: types.ERROR_FETCH_PAGE_COINS, error });
        }
    }
    else {
        yield put({ type: types.NO_MORE_FETCH_PAGE_COINS });
    }
}

function* refreshCoins({ header }) {
    const coins = yield select(coinsSelector);
    const coinsStore = (yield select(storeSelector)).coins;

    console.log("coins :", coins, "coinsStore :", coinsStore);
    var coinsToRefresh = [];

    coins.list.forEach(coinId => {
        console.log("coinsStore[" + coinId + "].experiedDate :", coinsStore[coinId].experiedDate);
        if (coinsStore[coinId].experiedDate <= Date.now()) {
            coinsToRefresh.push(coinId);
        }
    });

    console.log("coinsToRefresh :", coinsToRefresh)
    try {
        var updated = []
        for (let index = 0; index < coinsToRefresh.length; index++) {
            response = yield call(header.callback, coinsToRefresh[index]);
            updated.push(response);
        }
        yield put({
            type: types.SUCCESS_REFRESH_COINS, payload: {
                coins: updated
            }
        });
        yield put({
            type: types.UPDATE_STORE, payload: {
                toUpdate: 'coins',
                data: updated
            }
        });
    }
    catch (error) {
        yield put({ type: types.ERROR_REFRESH_COINS, error });
    }

}

function* coinsSaga() {
    yield all([
        takeLatest(types.START_FETCH_NEXT_PAGE_COINS, fetchNextPageCoins),
        takeLatest(types.START_REFRESH_COINS, refreshCoins)
    ])
}

export default coinsSaga;