import * as types from './types'
import { coinsSelector, storeSelector, userSelector } from '../selectors/sagaStateSelectors'

import { Api, ApiNameSpace } from '../api/api'

export function fetchListDataCoins(page = -1) {
    return {
        type: types.START_LIST_DATA,
        payload: {
            nameRequest: 'coins',
            nameStore: 'coins',
            nameResponse: 'coins',
            callback: Api.getCoins,
            url: ApiNameSpace.GET_COINS,
            selector: coinsSelector,
            storeSelector,
            userSelector,
            page: page,
            params: []
        }
    }
}

export function refreshDataCoins() {
    return {
        type: types.START_REFRESH_DATA,
        payload: {
            nameRequest: 'coins',
            nameStore: 'coins',
            nameResponse: 'coins',
            callback: Api.getCoins,
            url: ApiNameSpace.GET_COINS,
            selector: coinsSelector,
            storeSelector,
            userSelector,
            params: []
        }
    }
}