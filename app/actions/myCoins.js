import * as types from './types'
import Api from '../lib/api'

export function createMyCoin(id) {
    return {
        type: types.CREATE_ONE_MY_COIN,
        payload: {
            id
        }
    }
}

export function deleteMyCoin(id) {
    return {
        type: types.DELETE_ONE_MY_COIN,
        payload: {
            id
        }
    }
}

export function addOperetion(myCoinId, operation) {
    return {
        type: types.ADD_OPERATION_TO_ONE_MY_COIN,
        payload : {
            myCoinId,
            operation
        }
    }
}

export function deleteOperation(myCoinId, operationId) {
    return {
        type: types.DELETE_OPERATION_FROM_ONE_MY_COIN,
        payload: {
            myCoinId,
            operationId
        }
    }
}

export function editOperation(myCoinId, operationId, newOperation) {
    return {
        type: types.EDIT_OPERATION_OF_ONE_MY_COIN,
        payload: {
            myCoinId,
            operationId,
            newOperation
        }
    }
}