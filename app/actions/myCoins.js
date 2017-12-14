import * as types from './types'
import Api from '../lib/api'

export function createMyCoin(myCoin) {
    return {
        type: types.CREATE_ONE_MY_COIN,
        payload: {
            myCoin
        }
    }
}

export function editMyCoin(myCoin) {
    return {
        type: types.EDIT_ONE_MY_COIN,
        payload: {
            myCoin
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