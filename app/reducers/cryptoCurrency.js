import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

var initialState = {
    loading: Boolean,
    list: Array,
    listFav: Array
} 

export const cryptoCurencies = createReducer(initialState, {
    [types.START_FETCH_CRYTPO_CURRENCIES](state, action) {
        console.log("state.list :", state.list);
        let newState = {
            loading: true,
            list: state.list,
            listFav: []
        }

        return newState;
    },
    [types.END_FETCH_CRYTPO_CURRENCIES](state, action) {
        let newState = {
            loading: false,
            list: action.payload.cryptoCurrencies,
            listFav: []
        };
        return newState;
    },
    [types.ERROR_FETCH_CRYTPO_CURRENCIES](state, action) {
        let newState = {
            loading: false,
            list: state.list,
            listFav: []
        }

        return newState;
    }
});

