import { all } from 'redux-saga/effects'

import userSaga from './user';
import requestSaga from './requestSaga';

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        userSaga(),
        requestSaga(),
    ])
}