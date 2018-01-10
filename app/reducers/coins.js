import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

/**
 *  loading: Boolean,
 * list : [id]
 */
const initialState = {
    loading: false,
    list: [],
    listFav: [],
    pagination: {}
};

export const coins = createReducer(initialState, {
    [types.START_FETCH_NEXT_PAGE_COINS](state, action) {
        return update(state, {
            $merge: {
                loading: true
            }
        });
    },
    [types.SUCCESS_FETCH_NEXT_PAGE_COINS](state, action) {
        var coins = action.payload.coins.map(coin => (coin.id));
        var pagination = action.payload.pagination;

        return update(state, {
            list: {
                $push: coins
            },
            pagination: {
                $merge: pagination
            },
            loading: {$set: false}
        })
    },
    [types.NO_MORE_FETCH_PAGE_COINS](state, action) {
        return update(state, {
            $merge: {
                loading: false
            }
        })
    }
});

