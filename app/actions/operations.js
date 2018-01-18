import * as types from './types'
import { operationsSelector, storeSelector, userSelector } from '../selectors/sagaStateSelectors'

import { Api, ApiNameSpace } from '../api/api'

export function fetchListDataOperations(idPortfolios, myCoinId, page) {
    return {
        type: types.START_LIST_DATA,
        payload: {
            name: 'operations',
            nameResponse: 'operations',
            callback: Api.getPortfoliosOneMyCoinsOperations,
            url: ApiNameSpace.GET_OPERATION,
            selector: operationsSelector,
            storeSelector,
            userSelector,
            page: page ? page : -1,
            params: [idPortfolios, myCoinId]
        }
    }
}

export function refreshDataPortfolios() {
    return {
        type: types.START_REFRESH_DATA,
        payload: {
            name: 'operations',
            nameResponse: 'operations',
            callback: Api.getPortfoliosOneMyCoinsOperations,
            url: ApiNameSpace.GET_OPERATION,
            selector: operationsSelector,
            storeSelector,
            userSelector,
            params: []
        }
    }
}