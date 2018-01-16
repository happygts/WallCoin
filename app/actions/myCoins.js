import * as types from './types'
import { myCoinsSelector, storeSelector, userSelector } from '../selectors/sagaStateSelectors'

import { Api, ApiNameSpace } from '../api/api'

export function fetchListDataMyCoins(idPortfolios, page) {
    return {
        type: types.START_LIST_DATA,
        payload: {
            name: 'myCoins',
            nameResponse: 'coins',
            callback: Api.getPortfoliosMyCoins,
            url: ApiNameSpace.GET_MYCOINS,
            selector: myCoinsSelector,
            storeSelector,
            userSelector,
            page: page ? page : -1,
            params: [idPortfolios]
        }
    }
}

export function refreshDataMyCoins(idPortfolios) {
    return {
        type: types.START_REFRESH_DATA,
        payload: {
            name: 'myCoins',
            nameResponse: 'coins',
            callback: Api.getPortfoliosMyCoins,
            url: ApiNameSpace.GET_MYCOINS,
            selector: myCoinsSelector,
            storeSelector,
            userSelector,
            params: [idPortfolios]
        }
    }
}

export function fetchListDataMyCoinsFavorites(idPortfolios, page) {
    return {
        type: types.START_LIST_DATA,
        payload: {
            name: 'myCoins',
            nameResponse: 'coins',
            callback: Api.getPortfoliosMyCoinsFavorites,
            url: ApiNameSpace.GET_MYCOINS_FAVORITES,
            selector: myCoinsSelector,
            storeSelector,
            userSelector,
            page: page ? page : -1,
            params: [idPortfolios]
        }
    }
}

export function refreshDataMyCoinsFavorites(idPortfolios) {
    return {
        type: types.START_REFRESH_DATA,
        payload: {
            name: 'myCoins',
            nameResponse: 'coins',
            callback: Api.getPortfoliosMyCoinsFavorites,
            url: ApiNameSpace.GET_MYCOINS_FAVORITES,
            selector: myCoinsSelector,
            storeSelector,
            userSelector,
            params: [idPortfolios]
        }
    }
}