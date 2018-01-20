import * as types from './types'
import { operationsSelector, storeSelector, userSelector } from '../selectors/sagaStateSelectors'

import { Api, ApiNameSpace } from '../api/api'

export function fetchListDataOperations(idPortfolios, myCoinId, page) {
    return {
        type: types.START_LIST_DATA,
        payload: {
            nameRequest: 'operations',
            nameStore: 'operations',
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

export function refreshDataOperations() {
    return {
        type: types.START_REFRESH_DATA,
        payload: {
            nameRequest: 'operations',
            nameStore: 'operations',
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
            nameStore: 'operations',
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
            nameStore: 'operations',
            callback: Api.deletePortfoliosMyCoinsOperations,
            url: ApiNameSpace.DELETE_OPERATION,
            selector: operationsSelector,
            storeSelector,
            userSelector,
            idToDelete: operationId,
            params: [idPortfolios, myCoinId, operationId]
        }
    }
}

export function modifyOperation(idPortfolios, myCoinId, operationId, type, price, quantity) {
    return {
        type: types.MODIFY_CREATE_DATA,
        payload: {
            nameStore: 'operations',
            callback: Api.editPortfoliosMyCoinsOperations,
            url: ApiNameSpace.MODIFY_OPERATION,
            selector: operationsSelector,
            params: [idPortfolios, myCoinId, operationId, type, price, quantity]
        }
    }
}