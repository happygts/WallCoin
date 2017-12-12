import * as types from './types'
import Api from '../lib/api'

export function fetchCryptoCurencies() {
    return (dispatch, getState) => {
        dispatch({
            type: types.START_FETCH_CRYTPO_CURRENCIES,
            payload: {}
        })
        return Api.get(`/ticker/`).then(resp => {
            console.log("resp: ", resp);
            dispatch(receivedCryptoCurencies({cryptoCurrencies: resp}))
        }).catch((ex) => {
            dispatch(errorFetchCryptoCurencies({ex}))
        });
    }
}

export function receivedCryptoCurencies( {cryptoCurrencies} ) {
    return {
        type: types.END_FETCH_CRYTPO_CURRENCIES,
        payload: {
            cryptoCurrencies
        }
    }
}

export function errorFetchCryptoCurencies( {ex} ) {
    return {
        type: types.ERROR_FETCH_CRYTPO_CURRENCIES,
        payload: {
            ex
        }
    }
}