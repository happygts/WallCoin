import * as types from './types'
import { coinsSelector, storeSelector } from '../selectors/sagaStateSelectors'

import Api from '../api/api'

export function fetchNextPagePortfolios() {
    return {
        type: types.START_FETCH_NEXT_PAGE,
        header: {
            callback: Api.getPortfolios,
            name: 'portfolios',
            selector: coinsSelector,
            params: []
        }
    }
}
