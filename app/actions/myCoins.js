import * as types from './types'
import Api from '../lib/api'

export function createMyCoin(myCoin) {
    console.log("myCoin :", myCoin);
    return {
        type: types.CREATE_ONE_MY_COIN,
        payload: {
            myCoin
        }
    }
}