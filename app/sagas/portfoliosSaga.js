import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'
import * as types from '../actions/types'
import Api from '../api/api';

function* getPortfolios() {
    const response = yield call(Api.getPortfolios);

    console.log("response :", response);
    // yield put({ type: types.SUCCESS_GET_PORTFOLIOS, portfolios})
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* portfoliosSaga() {
    yield takeEvery(types.START_GET_PORTFOLIOS, getPortfolios);
}

export default portfoliosSaga;