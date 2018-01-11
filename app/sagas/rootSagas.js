import { all } from 'redux-saga/effects'

import userSaga from './user';
import portfoliosSaga from './portfoliosSaga';
import coinsSaga from './coinsSaga';
import paginationSaga from './paginationSaga';

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        userSaga(),
        coinsSaga(),
        paginationSaga(),
        portfoliosSaga()
    ])
}