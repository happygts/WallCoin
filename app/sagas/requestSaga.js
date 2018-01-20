import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, take, all, call, select, fork } from 'redux-saga/effects'
import * as types from '../actions/types'
import { Api } from '../api/api';
import * as actions from '../actions';

import {v4 as uuidV4} from 'uuid';

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

function getrequestIdFromRequests(requests, url, userId, params) {
    let indexToReturn;
    let idRequests = Object.keys(requests);

    for (let index = 0; index < idRequests.length; index++) {
        const request = requests[idRequests[index]];
        if (compareRequestWithNewRequest([request.data.url, request.data.userId, ...request.data.params], [url, userId, ...params])) {
            indexToReturn = idRequests[index];
            break;
        }
    }

    return indexToReturn;
}

function getEveryItemAssociatedWithPageAndRequest(store, requestId, page) {
    var toReturn = [];

    Object.keys(store).forEach((key) => {
        const element = store[key];
        for (let index = 0; index < Object.keys(element.contexts).length; index++) {
            const context = element.contexts[index];

            if (context.requestId == requestId && page == context.page) {
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

function* fetchPage(refresh, callback, url, page, userId, params, requestId, nameRequest, nameStore, nameResponse) {
    // call fetch
    var paramsWithoutPage = params;
    yield put(actions.ActionCreators.startFetch(callback, url, params = [page, ...params]));

    // wait for fetch to end
    var action;
    while (true) {
        action = yield take(['SUCCESS_FETCH', 'ERROR_FETCH']);
        if (action.payload.url == url) {
            break;
        }
    }

    if (action.type == 'ERROR_FETCH') {
        return;
    }
    yield put({
        type: types.UPDATE_STORE,
        payload: {
            toUpdate: nameStore,
            data: action.payload.data[nameResponse],
            requestId,
            page
        }
    });
    if (!refresh) {
        yield put({
            type: types.SUCCESS_LIST_DATA,
            payload: {
                name: nameRequest,
                data: action.payload.data[nameResponse],
                requestId,
                request: {
                    data: {
                        url,
                        userId,
                        params: paramsWithoutPage
                    },
                    pagination: action.payload.data.pagination
                }
            }
        });
    }
}

function* listData({ payload }) {
    const nameRequest = payload.nameRequest;
    const nameStore = payload.nameStore;
    const nameResponse = payload.nameResponse;

    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;
    const pageToFetch = payload.page;
    const sagaSelector = yield select(payload.selector);
    const storeSelector = yield select(payload.storeSelector);
    const userSelector = yield select(payload.userSelector);

    const userId = userSelector.userId;
    const storeElement = storeSelector[nameStore];
    const requests = sagaSelector ? sagaSelector.requests : [];
    var requestId = getrequestIdFromRequests(requests, url, userId, params);

    if (requestId) {
        if (requests[requestId].pagination.current * requests[requestId].pagination.size < requests[requestId].pagination.totalItems) {
            var page = pageToFetch == -1 ? requests[requestId].pagination.current + 1 : pageToFetch;
            var items = getEveryItemAssociatedWithPageAndRequest(storeElement, requestId, page);

            if (items.length > 0) {
                var percentageOutOfDate = compareExpirationDate(items);
                if (percentageOutOfDate == 0) {
                    console.log("everything uptoDate on this page");
                }
                if (percentageOutOfDate > 0) { // > MUST SET TO 10 %
                    yield fetchPage(false, callback, url, page, userId, params, requestId, nameRequest, nameStore, nameResponse);
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
                            name: nameRequest,
                            requestId
                        }
                    });
                }
            }
            else {
                yield fetchPage(false, callback, url, page, userId, params, requestId, nameRequest, nameStore, nameResponse);
            }
        }
        else {
            yield put({
                type: types.NO_MORE_LIST_DATA, payload: {
                    name: nameRequest,
                    requestId
                }
            });
        }
    }
    else {
        yield fetchPage(false, callback, url, 0, userId, params, uuidV4(), nameRequest, nameStore, nameResponse);
    }
}

function getEveryItemAssociatedWithRequest(storeElement, requestId) {
    var toReturn = [];

    Object.keys(storeElement).forEach((key) => {
        const element = storeElement[key];
        for (let index = 0; index < Object.keys(element.contexts).length; index++) {
            const context = element.contexts[index];

            if (context.requestId == requestId) {
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

export function* listDataFlow() {
    while (true) {
        var action = yield take('START_LIST_DATA');
        yield fork(listData, action);
    }
}


function* refreshData({ payload }) {
    const nameRequest = payload.nameRequest;
    const nameStore = payload.nameStore;
    const nameResponse = payload.nameResponse;

    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;

    const sagaSelector = yield select(payload.selector);
    const storeSelector = yield select(payload.storeSelector);
    const userSelector = yield select(payload.userSelector);

    const storeElement = storeSelector[nameStore];
    const userId = userSelector.userId;

    var itemsGroupedPages = groupItemsPerPage(getEveryItemAssociatedWithRequest(storeElement, sagaSelector.currentRequestId));
    for (let index = 0; index < itemsGroupedPages.length; index++) {
        const itemsOnePage = itemsGroupedPages[index];

        var percentageOutOfDate = compareExpirationDate(itemsOnePage);
        if (percentageOutOfDate == 0) {
            console.log("everything uptoDate on this page");
        }
        else if (percentageOutOfDate > 0) { // need to set to > 10 once refreshOne will be done
            console.log("refresh Here");
            yield fetchPage(true, callback, url, itemsOnePage[0].contexts[0].page, userId, params, sagaSelector.currentRequestId, nameRequest, nameStore, nameResponse);

        }
        else {
            console.log("refresh the only elements out of date");
        }
    }

    yield put({
        type: types.SUCCESS_REFRESH_DATA, payload: {
            name: nameRequest
        }
    });
}

export function* refreshDataFlow() {
    while (true) {
        var action = yield take('START_REFRESH_DATA');
        yield fork(refreshData, action);
    }
}

function* createData({ payload }) {
    const nameStore = payload.nameStore;
    const nameRequest = payload.nameRequest;

    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;
    const sagaSelector = yield select(payload.selector);
    const userSelector = yield select(payload.userSelector);

    console.log("CreateData :", params);
    yield put(actions.ActionCreators.startFetch(callback, url, params));

    // wait for fetch to end
    var action;
    while (true) {
        action = yield take(['SUCCESS_FETCH', 'ERROR_FETCH']);
        if (action.payload.url == url) {
            break;
        }
    }

    console.log("action received after fetch :", action);

    if (action.type == 'ERROR_FETCH') {
        return;
    }
    yield put({
        type: types.ADD_TO_STORE,
        payload: {
            toUpdate: nameStore,
            data: action.payload.data,
            requestId: sagaSelector.currentRequestId,
            page: 999999 // page impossible car non synchronisé
        }
    });
}

function* deleteData({ payload }) {
    const nameStore = payload.nameStore;

    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;
    const idToDelete = payload.idToDelete;

    const sagaSelector = yield select(payload.selector);
    const userSelector = yield select(payload.userSelector);

    yield put(actions.ActionCreators.startFetch(callback, url, params));

    // wait for fetch to end
    var action;
    while (true) {
        action = yield take(['SUCCESS_FETCH', 'ERROR_FETCH']);
        if (action.payload.url == url) {
            break;
        }
    }

    console.log("action received after fetch :", action);

    if (action.type == 'ERROR_FETCH') {
        return;
    }
    yield put({
        type: types.DELETE_TO_STORE,
        payload: {
            toUpdate: nameStore,
            idToDelete
        }
    });
}

function* modifyData({ payload }) {
    const nameStore = payload.nameStore;
    const nameRequest = payload.nameRequest;
    
    const url = payload.url;
    const params = payload.params;
    const callback = payload.callback;

    const sagaSelector = yield select(payload.selector);

    yield put(actions.ActionCreators.startFetch(callback, url, params));

    // wait for fetch to end
    var action;
    while (true) {
        action = yield take(['SUCCESS_FETCH', 'ERROR_FETCH']);
        if (action.payload.url == url) {
            break;
        }
    }

    console.log("action received after fetch :", action);

    if (action.type == 'ERROR_FETCH') {
        return;
    }
    yield put({
        type: types.UPDATE_STORE,
        payload: {
            toUpdate: nameStore,
            data: [action.payload.data],
            requestId: sagaSelector.currentRequestId,
            page
        }
    });
}

export function* requestSaga() {
    yield all([
        takeEvery(types.START_CREATE_DATA, createData),
        takeEvery(types.START_DELETE_DATA, deleteData),
        takeEvery(types.MODIFY_CREATE_DATA, modifyData)
    ])
}