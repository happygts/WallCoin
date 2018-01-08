import * as types from './types'
import Api from '../lib/api'

export function fetchCryptoCurencies() {
    return (dispatch, getState) => {
        dispatch({
            type: types.START_FETCH_CRYTPO_CURRENCIES,
            payload: {}
        });

        return Api.get('/ticker/')
            .then(resp => dispatch(receivedCryptoCurencies({cryptoCurrencies: resp})))
            .catch(error => dispatch(errorFetchCryptoCurencies({ error })));
    }
}

export function receivedCryptoCurencies({ cryptoCurrencies }) {
    return {
        type: types.END_FETCH_CRYTPO_CURRENCIES,
        payload: {
            cryptoCurrencies
        }
    }
}

export function errorFetchCryptoCurencies({ error }) {
    return {
        type: types.ERROR_FETCH_CRYTPO_CURRENCIES,
        error
    }
}

export function addFavCryptoCurrency(id) {
    return {
        type: types.ADD_FAV_CRYPTO_CURRENCY,
        payload: {
            id
        }
    }
}

export function removeFavCryptoCurrency(id) {
    return {
        type: types.REMOVE_FAV_CRYPTO_CURRENCY,
        payload: {
            id
        }
    }  
}

//

import Api2 from '../api/api'

export function fetchPageCoins(page) {
    return {
        type: types.START_FETCH_PAGE_COINS,
        payload: {
            page
        },
        header: {
            callback: Api2.getCoins
        }
    }
}