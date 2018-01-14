import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

function compareRequestWithNewRequest(requestArray, newRequestArray) {
    console.log("Inside compareRequestWithNewRequest :", requestArray, newRequestArray);
    if (requestArray.length != newRequestArray.length) {
        return false;
    }
    for (let index = 0; index < requestArray.length; index++) {
        if (requestArray[index] != newRequestArray[index]) {
            return false
        }
    }
    return true;
}

function getrequestIndexFromRequests(requests, url, userId, params) {
    var indexToReturn = -1;

    for (let index = 0; index < requests.length; index++) {
        const request = requests[index];
        if (compareRequestWithNewRequest([request.data.url, request.data.userId, ...request.data.params], [url, userId, ...params])) {
            indexToReturn = index;
            break;
        }
    }

    return indexToReturn;
}

function getEveryItemAssociatedWithPageAndRequest(store, requestIndex, page) {
    var toReturn = [];

    Object.keys(store).forEach((key) => {
        const element = store[key];
        for (let index = 0; index < Object.keys(element.contexts).length; index++) {
            const context = element.contexts[index];

            if (context.requestIndex == requestIndex && page == context.page) {
                toReturn.push(element);
                break;
            }
        }
    });

    return toReturn;
}

function compareExpirationDate(items) {
    var nbExpired = 0;

    items.forEach((item) => {
        nbExpired += item.expirationDate <= Date.now() ? 1 : 0;
    });

    return nbExpired * 100 / items.length;
}

function* fetchPage(callback, url, page, userId, params, requestIndex, name) {
    try {
        const response = yield call(callback, page, ...params);
        yield put({
            type: types.UPDATE_STORE, payload: {
                toUpdate: name,
                data: response[name],
                requestIndex,
                page
            }
        });
        yield put({
            type: types.SUCCESS_LIST_DATA,
            payload: {
                name,
                data: response[name],
                requestIndex,
                request: {
                    data: {
                        url,
                        userId,
                        params
                    },
                    pagination: response.pagination
                }
            }
        });
    }
    catch (error) {
        yield put({ type: types.ERROR_FETCH_PAGE, error });
    }
}

function* listData({ payload }) {
    const name = payload.name;
    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;
    const sagaSelector = yield select(payload.selector);
    const storeSelector = yield select(payload.storeSelector);
    const userSelector = yield select(payload.userSelector);

    const userId = userSelector.userId;
    const storeElement = storeSelector[name];
    const requests = sagaSelector ? sagaSelector.requests : [];

    var requestIndex = getrequestIndexFromRequests(requests, url, userId, params);
    if (requestIndex >= 0) {
        if (requests[requestIndex].pagination.current * requests[requestIndex].pagination.size < requests[requestIndex].pagination.totalItems) {
            var newPage = requests[requestIndex].pagination.current + 1
            var items = getEveryItemAssociatedWithPageAndRequest(storeElement, requestIndex, newPage);
            if (items.length > 0) {
                if (compareExpirationDate(items) > 0) { // > MUST SET TO 10 %
                    yield fetchPage(callback, url, page, userId, params, requestIndex, name);
                }
                else {
                    // reload every item one by one ONLY THE OUTOFDATE
                    items.forEach(element => {
                        if (element.expirationDate < Date.now()) {
                            console.log("need to reload :", element);
                        }
                    });
                    yield put({
                        type: types.NO_MORE_LIST_DATA, payload: {
                            name
                        }
                    });
                }
            }
            else {
                yield fetchPage(callback, url, newPage, userId, params, requestIndex, name);
            }
        }
        else {
            yield put({
                type: types.NO_MORE_LIST_DATA, payload: {
                    name
                }
            });
        }
    }
    else {
        yield fetchPage(callback, url, 0, userId, params, requests.length, name);
    }
}

function getEveryItemAssociatedWithRequest(storeElement, requestIndex) {
    var toReturn = [];

    Object.keys(storeElement).forEach((key) => {
        const element = storeElement[key];
        for (let index = 0; index < Object.keys(element.contexts).length; index++) {
            const context = element.contexts[index];

            if (context.requestIndex == requestIndex) {
                toReturn.push(element);
                break;
            }
        }
    });

    return toReturn;
}

function groupItemsPerPage(items) {
    var page = 0;
    var toReturn = {}

    while (itemsPage = items.filter((item) => {
        for (let index = 0; index < Object.keys(item.contexts).length; index++) {
            const context = item.contexts[index];

            if (context.page == page) {
                return true;
            }
        }
        return false
    })) {
        if (itemsPage.length <= 0) {
            break;
        }
        toReturn[page] = itemsPage;
        page++;
    }

    return toReturn;
}

function* refreshData({ payload }) {
    console.log("RefreshData inside saga");
    const name = payload.name;
    const sagaSelector = yield select(payload.selector);
    const storeSelector = yield select(payload.storeSelector);
    const userSelector = yield select(payload.userSelector);

    const userId = userSelector.userId;
    const storeElement = storeSelector[name];

    var itemsGroupedPages = groupItemsPerPage(getEveryItemAssociatedWithRequest(storeElement, sagaSelector.currentRequestIndex));

    console.log("itemsGroupedPages :", itemsGroupedPages);
    yield put({
        type: types.SUCCESS_REFRESH_DATA, payload: {
            name
        }
    });
}

function* requestSaga() {
    yield all([
        takeEvery(types.START_LIST_DATA, listData),
        takeEvery(types.START_REFRESH_DATA, refreshData),
    ])
}

export default requestSaga;