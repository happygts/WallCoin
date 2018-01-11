import * as types from './types'
import Api from '../lib/api'

import { coinsSelector, storeSelector } from '../selectors/sagaStateSelectors'

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

export function fetchNextPageCoins() {
    return {
        type: types.START_FETCH_NEXT_PAGE,
        header: {
            callback: Api2.getCoins,
            name: 'coins',
            selector: coinsSelector
        }
    }
}

export function refreshCoins() {
    return {
        type: types.START_REFRESH_PAGINATION,
        header: {
            callback: Api2.getOneCoins,
            name: 'coins',
            selector: coinsSelector,
            storeSelector: storeSelector
        }
    }
}