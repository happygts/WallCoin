import * as types from './types'
import { coinsSelector, storeSelector, userSelector } from '../selectors/sagaStateSelectors'

import { Api, ApiNameSpace } from '../api/api'

export function fetchListDataCoins() {
    console.log("fetchListDataCoins action");
    return {
        type: types.START_LIST_DATA,
        payload: {
            name: 'coins',
            callback: Api.getCoins,
            url: ApiNameSpace.GET_COINS,
            selector: coinsSelector,
            storeSelector,
            userSelector,
            params: []
        }
    }
}

export function refreshDataCoins() {
    return {
        type: types.START_REFRESH_PAGINATION,
        payload: {
            callback: Api.getOneCoins,
            name: 'coins',
            selector: coinsSelector,
            storeSelector: storeSelector
        }
    }
}