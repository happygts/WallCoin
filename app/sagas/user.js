import { delay } from 'redux-saga'
import { put, takeEvery, call, select, take, all } from 'redux-saga/effects'
import * as types from '../actions/types'
import { Api } from '../api/api';
import * as actions from '../actions';
import { storeSelector } from '../selectors/sagaStateSelectors'

function* login({ payload: { email, password } }) {
    try {
        const { accessToken, refreshToken } = yield call(Api.login, email, password);
        const { id, status } = yield call(Api.me, accessToken = accessToken);

        yield put(actions.ActionCreators.updateAccessToken(accessToken));
        yield delay(1000);
        yield put({
            type: types.SUCCESS_LOGIN,
            payload: {
                userId: id,
                email: email,
                status: status,
                refreshToken: refreshToken
            }
        });
    }
    catch (error) {
        yield delay(1000);
        yield put({ type: types.ERROR_LOGIN, error });
    }
}

function* logout() {
    console.log("LOGOUT delete token ?");
}

function* modifyMyCoinId({ payload }) {
    const myCoinId = payload.myCoinId;
    const userSelector = yield select(payload.userSelector);

    yield put(actions.ActionCreators.fetchListDataOperations(userSelector.currentPortfolioId, myCoinId, page = 0));
}

export const userSaga = function* userSaga() {
    yield all([
        yield takeEvery(types.START_LOGIN, login),
        yield takeEvery(types.START_LOGOUT, logout),
        yield takeEvery(types.MODIFY_CURRENT_MYCOIN_ID, modifyMyCoinId)
    ])
}

function* initStateAppWithUserId(userId) {
    yield put(actions.ActionCreators.fetchListDataCoins(page = 0));
    yield put(actions.ActionCreators.fetchListDataPortfolios(page = 0));

    return 2; // number of actions inside the function
}

export const successLoginFlow = function* successLoginFlow() {
    while (true) {
        const { payload: { userId } } = yield take('SUCCESS_LOGIN');

        var numberOfCalls = yield initStateAppWithUserId(userId);

        while (numberOfCalls > 0) {
            const action = yield take(['SUCCESS_LIST_DATA', 'NO_MORE_LIST_DATA', 'ERROR_FETCH_PAGE']);

            numberOfCalls -= 1;
        }
        const store = yield select(storeSelector);
        const portfolios = store.portfolios;

        yield put({
            type: types.MODIFY_CURRENT_PORTFOLIOS_ID,
            payload: {
                currentPortfolioId: Object.keys(portfolios)[0]
            }
        });
        console.log("fetchListDataMyCoins");
        yield put(actions.ActionCreators.fetchListDataMyCoins(idPortfolios = Object.keys(portfolios)[0], page = 0));
        // yield put(actions.ActionCreators.fetchListDataMyCoins(idPortfolios = Object.keys(portfolios)[0], page = 0));

        console.log("success load all ressources");
    }
}