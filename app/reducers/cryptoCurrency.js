import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

const initialState = {
    loading: false,
    list: [],
    listFav: []
};

export const cryptoCurencies = createReducer(initialState, {
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
    [types.ADD_FAV_CRYPTO_CURRENCY](state, action) {
        return update(state, {
            listFav: {
                $push: [action.payload.id]
            }
        });
    },
    [types.REMOVE_FAV_CRYPTO_CURRENCY](state, action) {
        return update(state, {
            listFav: {
                $splice: [[state.listFav.indexOf(action.payload.id), 1]]
            }
        });
    }
});

