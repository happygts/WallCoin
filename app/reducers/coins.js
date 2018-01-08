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
    listV2: [],
    pagination: {}
};

export const coins = createReducer(initialState, {
    [types.START_FETCH_CRYTPO_CURRENCIES](state, action) {
        return update(state, {
            $merge: {
                loading: true
            }
        });
    },
    [types.END_FETCH_CRYTPO_CURRENCIES](state, action) {
        return update(state, {
            $merge: {
                loading: false,
                list: action.payload.cryptoCurrencies
            }
        });
    },
    [types.ERROR_FETCH_CRYTPO_CURRENCIES](state, action) {
        return update(state, {
            $merge: {
                loading: false
            }
        });
    },
    [types.SUCCESS_FETCH_PAGE_COINS](state, action) {
        var coins = action.payload.coins.map(coin => (coin.id));
        var pagination = action.payload.pagination;

        state = update(state, {
            listV2: {
                $merge: coins
            },
            pagination: {
                $merge: pagination
            }
        })
        console.log("state2 :", state);
        return state;
    }
});

