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

export function createOperation(idPortfolios, myCoinId, type, price, quantity) {
    return {
        type: types.START_CREATE_DATA,
        payload: {
            name: 'operations',
            nameResponse: 'operations',
            callback: Api.createPortfoliosMyCoinsOperations,
            url: ApiNameSpace.CREATE_OPERATION,
            selector: operationsSelector,
            storeSelector,
            userSelector,
            params: [idPortfolios, myCoinId, type, price, quantity]
        }
    }
}

export function deleteOperation(idPortfolios, myCoinId, operationId) {
    console.log("idPortfolios :", idPortfolios, "myCoinId :", myCoinId, "operationId :", operationId);
    return {
        type: types.START_DELETE_DATA,
        payload: {
            name: 'operations',
            callback: Api.editPortfoliosMyCoinsOperations,
            url: ApiNameSpace.MODIFY_OPERATION,
            selector: operationsSelector,
            storeSelector,
            userSelector,
            idToDelete: myCoinId,
            params: [idPortfolios, myCoinId]
        }
    }
}

export function modifyOperation(idPortfolios, myCoinId, type, price, quantity) {
    return {
        type: types.MODIFY_CREATE_DATA,
        payload: {
            name: 'operations',
            nameResponse: 'operations',
            callback: Api.editPortfoliosMyCoins,
            url: ApiNameSpace.MODIFY_MY_COIN,
            selector: operationsSelector,
            params: [idPortfolios, myCoinId, isFavorite]
        }
    }
}