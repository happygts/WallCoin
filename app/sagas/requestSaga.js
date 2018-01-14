import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

// function* fetchNextPage({ header }) {
//     const name = header.name;
//     const params = header.params;
//     const sagaSelector = yield select(header.selector);
//     const pagination = sagaSelector ? sagaSelector.pagination : {};

//     console.log("pagination :", pagination, "params :", params);

//     if (!pagination.current || pagination.current * pagination.size < pagination.totalItems) {
//         try {
//             const response = yield call(header.callback, pagination && pagination.current >= 0 ? pagination.current + 1 : 0, ...params);

//             console.log("response :", response);
//             console.log("response[name] :", response[name]);
//             yield put({
//                 type: types.UPDATE_STORE, payload: {
//                     toUpdate: name,
//                     data: response[name]
//                 }
//             });
//             yield put({
//                 type: types.SUCCESS_FETCH_PAGE,
//                 payload: {
//                     data: response[name],
//                     pagination: response.pagination
//                 }
//             });
//         }
//         catch (error) {
//             yield put({ type: types.ERROR_FETCH_PAGE, error });
//         }
//     }
//     else {
//         yield put({
//             type: types.NO_MORE_FETCH_PAGE, payload: {
//                 name
//             }
//         });
//     }
// }

// function* fetchPage({ header }) {
//     const name = header.name;
//     const params = header.params;
//     const page = header.page;

//     const sagaSelector = yield select(header.selector);

//     try {
//         const response = yield call(header.callback, page, ...params);

//         yield put({
//             type: types.UPDATE_STORE, payload: {
//                 toUpdate: name,
//                 data: response[name]
//             }
//         });
//         yield put({
//             type: types.SUCCESS_FETCH_PAGE,
//             payload: {
//                 name,
//                 data: response[name],
//                 pagination: response.pagination
//             }
//         });
//     }
//     catch (error) {
//         yield put({ type: types.ERROR_FETCH_PAGE, error });
//     }
// }

// function* refreshPagination({ header }) {
//     const name = header.name;
//     const sagaSelector = yield select(header.selector);
//     const storeSelector = yield select(header.storeSelector)
//     const storeElements = storeSelector[name];

//     var elementsToRefresh = [];

//     sagaSelector.list.forEach(id => {
//         if (storeElements[id].experiedDate <= Date.now()) {
//             elementsToRefresh.push(id);
//         }
//     });

//     try {
//         var data = []
//         for (let index = 0; index < elementsToRefresh.length; index++) {
//             response = yield call(header.callback, elementsToRefresh[index]);
//             data.push(response);
//         }
//         console.log("Data :", data);
//         yield put({
//             type: types.SUCCESS_REFRESH_PAGINATION,
//             payload: {
//                 name,
//                 data
//             }
//         });
//         yield put({
//             type: types.UPDATE_STORE, payload: {
//                 toUpdate: name,
//                 data
//             }
//         });
//     }
//     catch (error) {
//         yield put({ type: types.ERROR_REFRESH_PAGINATION, error });
//     }

// }

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
    console.log("inside fetchPage");
    try {
        const response = yield call(callback, page, ...params);
        console.log("response :", response);
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
            console.log("items associated :", items, "with requestIndex :", requestIndex, " and page :", newPage, "storeElement :", storeElement);
            if (items.length > 0) {
                if (compareExpirationDate(items) > 0) { // > MUST SET TO 10 %
                    console.log("compareExpirationDate > 10");
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

function* refreshData({ payload }) {
    const name = payload.name;

}

function* requestSaga() {
    yield all([
        takeEvery(types.START_LIST_DATA, listData),
        takeEvery(types.START_REFRESH_DATA, refreshData),
    ])
}

export default requestSaga;