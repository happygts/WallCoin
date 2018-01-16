import { delay } from 'redux-saga'
import { put, takeEvery, call, select, take} from 'redux-saga/effects'
import * as types from '../actions/types'
import { Api } from '../api/api';
import * as actions from '../actions';
import { coinsSelector, storeSelector, userSelector, portfoliosSelector } from '../selectors/sagaStateSelectors'

function* login({ payload: { email, password } }) {
    try {
        const response = yield call(Api.login, email, password);
        console.log("response :", response);
        yield delay(1000);
        yield put({
            type: types.SUCCESS_LOGIN,
            payload: {
                userId: response.id,
                email: response.email,
                status: response.status
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

function* initStateAppWithUserId(userId) {
    yield put(actions.ActionCreators.fetchListDataCoins(page = 0));
    yield put(actions.ActionCreators.fetchListDataPortfolios(page = 0));

    return 2; // number of actions inside the function
}

export const userSaga = function* userSaga() {
    yield takeEvery(types.START_LOGIN, login);
    yield takeEvery(types.START_LOGOUT, logout)
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
        console.log("portfolios :", Object.keys(portfolios)[0]);
        yield put({
            type: types.MODIFY_CURRENT_PORTFOLIOS_ID,
            payload: {
                currentPortfolioId: Object.keys(portfolios)[0]
            }
        });
        yield put(actions.ActionCreators.fetchListDataMyCoins(idPortfolios = Object.keys(portfolios)[0], page = 0));
        // yield put(actions.ActionCreators.fetchListDataMyCoins(idPortfolios = Object.keys(portfolios)[0], page = 0));

        console.log("success load all ressources");        
    }
}