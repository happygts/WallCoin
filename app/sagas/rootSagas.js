import { all } from 'redux-saga/effects'

import userSaga from './user';
import portfoliosSaga from './portfoliosSaga';
import paginationSaga from './paginationSaga';

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        userSaga(),
        paginationSaga(),
        portfoliosSaga()
    ])
}