import * as types from './types'
import { portfoliosSelector, storeSelector, userSelector } from '../selectors/sagaStateSelectors'

import { Api, ApiNameSpace } from '../api/api'

export function fetchListDataPortfolios(page) {
    return {
        type: types.START_LIST_DATA,
        payload: {
            nameRequest: 'portfolios',
            nameStore: 'portfolios',
            nameResponse: 'portfolios',
            callback: Api.getPortfolios,
            url: ApiNameSpace.GET_PORTFOLIOS,
            selector: portfoliosSelector,
            storeSelector,
            userSelector,
            page: page ? page : -1,
            params: []
        }
    }
}

export function refreshDataPortfolios() {
    return {
        type: types.START_REFRESH_DATA,
        payload: {
            nameRequest: 'portfolios',
            nameStore: 'portfolios',
            nameResponse: 'portfolios',
            callback: Api.getPortfolios,
            url: ApiNameSpace.GET_PORTFOLIOS,
            selector: portfoliosSelector,
            storeSelector,
            userSelector,
            params: []
        }
    }
}