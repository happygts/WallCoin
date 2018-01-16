import * as types from './types'
import { coinsSelector, storeSelector, userSelector } from '../selectors/sagaStateSelectors'

import { Api, ApiNameSpace } from '../api/api'

export function startFetch(callback, url, params) {
    console.log("StartFetch url :", url);
    return {
        type: types.START_FETCH,
        payload: {
            callback: callback,
            url: url,
            params: params
        }
    }
}

export function successFetch(data, url) {
    console.log("SuccessFetch url :", url);
    return {
        type: types.SUCCESS_FETCH,
        payload: {
            url,
            data
        }
    }
}

export function errorFetch(error, url) {
    return {
        type: types.ERROR_FETCH,
        payload: {
            url,
            error
        }
    }
}