import * as types from './types'
import { coinsSelector, storeSelector } from '../selectors/sagaStateSelectors'

import Api from '../api/api';

export function fetchNextPageFavorites() {
    return (dispatch, getState) => {
        const state = getState();

        console.log("state HERE :", state);
        // dispatch({
        //     type: types.START_FETCH_NEXT_PAGE,
        //     header: {
        //         callback: Api2.getPortfoliosMyCoinsFavorites,
        //         name: 'favorites',
        //         selector: favoritesSelector,
        //         params: []
        //     }
        // })
    }
}

// export function refreshFavorites() {
//     return {
//         type: types.START_REFRESH_PAGINATION,
//         header: {
//             callback: Api2.getPortfoliosMyCoinsFavorites,
//             name: 'favorites',
//             selector: coinsSelector,
//             storeSelector: storeSelector
//         }
//     }
// }