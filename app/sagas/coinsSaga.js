import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

import { coinsPagination } from '../selectors/sagaStateSelectors'

function* fetchNextPageCoins({ header }) {
    const pagination = yield select(coinsPagination);

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
        }
        catch (error) {
            yield put({ type: types.ERROR_FETCH_PAGE_COINS, error });
        }
    }
    else {
        yield put({ type: types.NO_MORE_FETCH_PAGE_COINS });
    }
}

function* coinsSaga() {
    yield takeLatest(types.START_FETCH_NEXT_PAGE_COINS, fetchNextPageCoins);
}

export default coinsSaga;