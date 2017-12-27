import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
import * as types from '../actions/types'

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
    yield delay(1000)
    yield put({ type: types.SUCCESS_LOGIN })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* loginAsync() {
    console.log("loginAsync :", types)
    yield takeEvery(types.START_LOGIN, incrementAsync)
}

export {loginAsync};