import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

/**
 * coins: { id: {
 *              value,
 *              experiedDate
 *          }
 * },
 * portfolios: {
 *          id: {
 *              value,
 *              experiedDate,
 *              synchronised
 *          }
 * },
 * myCoins: {
 *          id: {
 *              value,
 *              porfolioId,
 *              experiedDate,
 *              synchronised
 *          }
 * },
 * operations: {
 *          id: {
 *              value,
 *              myCoinId,
 *              experiedDate
 *              synchronised
 *          }
 * }
 */
const initialState = {
    coins: {},
    portfolios: {},
    myCoins: {},
    operations: {}
};

export const store = createReducer(initialState, {
    [types.SUCCESS_FETCH_PAGE_COINS](state, action) {
        var coins = action.payload.coins;
        var pagination = action.payload.pagination;

        coins.forEach(coin => {
            state = update(state, {
                coins: {
                    [coin.id]: {
                        $set: {
                            value: coin,
                            experiedDate: Date.now() + (2 * 60 * 1000)
                        }
                    }
                }
            })
        });
        console.log("state :", state);
        return state;
    },
});