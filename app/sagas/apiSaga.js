import { delay } from 'redux-saga'
import { put, takeEvery, call, select, take, fork} from 'redux-saga/effects'
import * as types from '../actions/types'
import { Api } from '../api/api';
import * as actions from '../actions';
import { userSelector } from '../selectors/sagaStateSelectors'
import jwt from 'jwt-decode'

function* startFetch(callback, url, token, params) {
    const response = yield call(callback, ...params, token = token);
    return response;
}

function* getNewToken(userStore) {
    const userId = userStore.userId;
    const refreshToken = userStore.refreshToken;

    const response = yield call(Api.token, userId, refreshToken);
    var decoded = jwt(response.accessToken);

    return response.accessToken;
}

function checkAccessToken(accessToken) {
    var decoded = jwt(accessToken);

    return decoded.exp < Date.now() / 1000;
}

function* handleReceivedStartFetch({ callback, url, params }) {
    try {
        const userStore = yield select(userSelector);
        let accessToken = userStore.accessToken;
        let accessTokenIsExpired = checkAccessToken(accessToken)

        if (accessTokenIsExpired) {
            accessToken =  yield getNewToken(userStore);
            yield put(actions.ActionCreators.updateAccessToken(accessToken));
        }
        var response = yield startFetch(callback, url, accessToken, params);
        yield put(actions.ActionCreators.successFetch(response, url));
    }
    catch (error) {
        yield put(actions.ActionCreators.errorFetch(error, url));
    }
}

export default apiSaga = function* () {
    while (true) {
        const { payload } = yield take('START_FETCH');

        yield fork(handleReceivedStartFetch, payload)
    }
}