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
    [types.UPDATE_STORE](state, action) {
        var data = action.payload.data;
        var toUpdate = action.payload.toUpdate;
        
        data.forEach(element => {
            state = update(state, {
                [toUpdate]: {
                    $merge: {
                        [element.id]: {
                            value: element,
                            experiedDate: Date.now() + (2 * 60 * 1000)
                        }
                    }
                }
            })
        });

        return state;
    },
});