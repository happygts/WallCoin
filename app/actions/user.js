import * as types from './types'
import { userSelector } from '../selectors/sagaStateSelectors'

export function login(email, password) {
    return {
        type: types.START_LOGIN,
        payload: {
            email,
            password
        }
    }
}

export function logout() {
    return {
        type: types.START_LOGOUT
    }
}

export function register(email, password) {
    return {
        type: types.START_REGISTER,
        payload: {
            email,
            password
        }
    }
}

export function changeUserPortfolio(portfolioId) {
    return {
        type: types.MODIFY_CURRENT_PORTFOLIOS_ID,
        payload: {
            currentPortfolioId: portfolioId
        }
    }
}

export function changeUserMyCoin(myCoinId) {
    return {
        type: types.MODIFY_CURRENT_MYCOIN_ID,
        payload: {
            myCoinId,
            userSelector
        }
    }
}

export function whoAmI() {
    return {
        type: types.START_WHO_AM_I
    }
}

export function updateAccessToken(accessToken) {
    return {
        type: types.UPDATE_ACCESS_TOKEN,
        payload: {
            accessToken
        }
    }
}