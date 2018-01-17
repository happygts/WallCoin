import { all } from 'redux-saga/effects'

import { userSaga, successLoginFlow } from './user';
import { apiSaga, apiErrorSaga } from './apiSaga';
import { requestSaga, listDataFlow, refreshDataFlow } from './requestSaga';

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        apiSaga(),
        apiErrorSaga(),
        userSaga(),
        successLoginFlow(),
        requestSaga(),
        listDataFlow(),
        refreshDataFlow()
    ])
}