import { all } from 'redux-saga/effects'

import { userSaga, successLoginFlow } from './user';
import apiSaga from './apiSaga';
import { requestSaga, listDataFlow } from './requestSaga';

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        apiSaga(),
        userSaga(),
        successLoginFlow(),
        requestSaga(),
        listDataFlow()
    ])
}