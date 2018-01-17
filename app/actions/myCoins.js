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

export function createMyCoin(idPortfolios, coinId, isFavorite) {
    return {
        type: types.START_CREATE_DATA,
        payload: {
            name: 'myCoins',
            nameResponse: 'coins',
            callback: Api.createPortfoliosMyCoins,
            url: ApiNameSpace.CREATE_MY_COIN,
            selector: myCoinsSelector,
            storeSelector,
            userSelector,
            params: [idPortfolios, coinId, isFavorite]
        }
    }
}

export function deleteMyCoin(idPortfolios, myCoinId) {
    console.log("idPortfolios :", idPortfolios, "myCoinId :", myCoinId);
    return {
        type: types.START_DELETE_DATA,
        payload: {
            name: 'myCoins',
            callback: Api.deletePortfoliosMyCoins,
            url: ApiNameSpace.DELTE_MY_COIN,
            selector: myCoinsSelector,
            storeSelector,
            userSelector,
            idToDelete: myCoinId,
            params: [idPortfolios, myCoinId]
        }
    }
}