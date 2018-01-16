import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

function compareRequestWithNewRequest(requestArray, newRequestArray) {
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

function* fetchPage(refresh, callback, url, page, userId, params, requestIndex, name, nameResponse) {
    try {
        console.log("callback :", callback);
        const response = yield call(callback, page, ...params);
        console.log("fetchPage response :", response, "name :", nameResponse);
        yield put({
            type: types.UPDATE_STORE,
            payload: {
                toUpdate: name,
                data: response[nameResponse],
                requestIndex,
                page
            }
        });
        if (!refresh) {
            yield put({
                type: types.SUCCESS_LIST_DATA,
                payload: {
                    name,
                    data: response[nameResponse],
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
    }
    catch (error) {
        yield put({ type: types.ERROR_LIST_DATA, error });
    }
}

function* listData({ payload }) {
    const name = payload.name;
    const nameResponse = payload.nameResponse;
    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;
    const pageToFetch = payload.page;
    const sagaSelector = yield select(payload.selector);
    const storeSelector = yield select(payload.storeSelector);
    const userSelector = yield select(payload.userSelector);

    const userId = userSelector.userId;
    const storeElement = storeSelector[name];
    const requests = sagaSelector ? sagaSelector.requests : [];
    console.log("requests :", sagaSelector);
    var requestIndex = getrequestIndexFromRequests(requests, url, userId, params);
    if (requestIndex >= 0) {
        if (requests[requestIndex].pagination.current * requests[requestIndex].pagination.size < requests[requestIndex].pagination.totalItems) {
            var page = pageToFetch == -1 ? requests[requestIndex].pagination.current + 1 : pageToFetch;
            var items = getEveryItemAssociatedWithPageAndRequest(storeElement, requestIndex, page);

            if (items.length > 0) {
                var percentageOutOfDate = compareExpirationDate(items);
                if (percentageOutOfDate == 0) {
                    console.log("everything uptoDate on this page");
                }
                if (percentageOutOfDate > 0) { // > MUST SET TO 10 %
                    yield fetchPage(false, callback, url, page, userId, params, requestIndex, name, nameResponse);
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
                yield fetchPage(false, callback, url, page, userId, params, requestIndex, name, nameResponse);
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
        yield fetchPage(false, callback, url, 0, userId, params, requests.length, name, nameResponse);
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
    var toReturn = []

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
        toReturn.push(itemsPage);
        page++;
    }

    return toReturn;
}

function* refreshData({ payload }) {
    const name = payload.name;
    const nameResponse = payload.nameResponse;
    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;

    const sagaSelector = yield select(payload.selector);
    const storeSelector = yield select(payload.storeSelector);
    const userSelector = yield select(payload.userSelector);

    const storeElement = storeSelector[name];
    const userId = userSelector.userId;

    var itemsGroupedPages = groupItemsPerPage(getEveryItemAssociatedWithRequest(storeElement, sagaSelector.currentRequestIndex));
    for (let index = 0; index < itemsGroupedPages.length; index++) {
        const itemsOnePage = itemsGroupedPages[index];

        var percentageOutOfDate = compareExpirationDate(itemsOnePage);
        if (percentageOutOfDate == 0) {
            console.log("everything uptoDate on this page");
        }
        else if (percentageOutOfDate > 0) { // need to set to > 10 once refreshOne will be done
            yield fetchPage(true, callback, url, itemsOnePage[0].contexts[0].page, userId, params, sagaSelector.currentRequestIndex, name, nameResponse);
            
        }
        else {
            console.log("refresh the only elements out of date");
        }
    }

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