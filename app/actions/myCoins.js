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