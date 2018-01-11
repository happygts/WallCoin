import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

function* fetchNextPage({ header }) {
    const name = header.name;
    const sagaSelector = yield select(header.selector);
    const pagination = sagaSelector ? sagaSelector.pagination : {};

    console.log("pagination :", pagination);

    if (!pagination.current || pagination.current * pagination.size < pagination.totalItems) {
        try {
            const response = yield call(header.callback, pagination && pagination.current >= 0 ? pagination.current + 1 : 0);
            console.log("response :", response);
            console.log("response[name] :", response[name]);
            yield put({
                type: types.SUCCESS_FETCH_NEXT_PAGE,
                payload: {
                    name: name,
                    data: response[name],
                    pagination: response.pagination
                }
            });
            yield put({
                type: types.UPDATE_STORE, payload: {
                    toUpdate: name,
                    data: response[name]
                }
            });
        }
        catch (error) {
            yield put({ type: types.ERROR_FETCH_PAGE, error });
        }
    }
    else {
        yield put({ type: types.NO_MORE_FETCH_PAGE, payload: {
            name
        }});
    }
}

function* refreshPagination({ header }) {
    const name = header.name;
    const sagaSelector = yield select(header.selector);
    const storeSelector = yield select(header.storeSelector)
    const storeElements = storeSelector[name];

    var elementsToRefresh = [];

    sagaSelector.list.forEach(id => {
        if (storeElements[id].experiedDate <= Date.now()) {
            elementsToRefresh.push(id);
        }
    });

    try {
        var updated = []
        for (let index = 0; index < elementsToRefresh.length; index++) {
            response = yield call(header.callback, elementsToRefresh[index]);
            updated.push(response);
        }
        yield put({
            type: types.SUCCESS_REFRESH_PAGINATION, payload: {
                coins: updated
            }
        });
        yield put({
            type: types.UPDATE_STORE, payload: {
                toUpdate: name,
                data: updated
            }
        });
    }
    catch (error) {
        yield put({ type: types.ERROR_REFRESH_PAGINATION, error });
    }

}

function* paginationSaga() {
    yield all([
        takeLatest(types.START_FETCH_NEXT_PAGE, fetchNextPage),
        takeLatest(types.START_REFRESH_PAGINATION, refreshPagination)
    ])
}

export default paginationSaga;