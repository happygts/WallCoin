import { delay } from 'redux-saga'
import { put, takeEvery, call, select, take, fork} from 'redux-saga/effects'
import * as types from '../actions/types'
import { Api } from '../api/api';
import * as actions from '../actions';
import { userSelector } from '../selectors/sagaStateSelectors'

function* startFetch(callback, url, token, params) {
    console.log("StartFetch :", params);
    const response = yield call(callback, ...params, token = token);
    return response;
}

function* getNewToken() {
    const userStore = yield select(userSelector);
    const userId = userStore.userId;
    console.log("userStore :", userStore);
    const refreshToken = userStore.refreshToken;

    const response = yield call(Api.token, userId, refreshToken);

    return response.accessToken;
}

function* handleReceivedStartFetch({ callback, url, params }) {
    try {
        console.log("url apiSaga:", url);
        var token = yield getNewToken();
        var response = yield startFetch(callback, url, token, params);
        yield put(actions.ActionCreators.successFetch(response, url));
    }
    catch (error) {
        console.log("error startFetch :", error, "url :", url);
        yield put(actions.ActionCreators.errorFetch(error, url));
    }
}

export default apiSaga = function* () {
    while (true) {
        const { payload } = yield take('START_FETCH');

        yield fork(handleReceivedStartFetch, payload)
    }
}