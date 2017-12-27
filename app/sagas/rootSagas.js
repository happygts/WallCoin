import { all } from 'redux-saga/effects'

import { loginAsync } from './login'

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        loginAsync()
    ])
}