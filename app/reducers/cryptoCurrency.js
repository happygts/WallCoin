import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

const initialState = {
    loading: false,
    list: [],
    listFav: []
};

export const cryptoCurencies = createReducer(initialState, {
    [types.START_FETCH_CRYTPO_CURRENCIES](state, action) {
        const newState = {
            loading: true,
            list: state.list,
            listFav: state.listFav
        }

        return newState;
    },
    [types.END_FETCH_CRYTPO_CURRENCIES](state, action) {
        const newState = {
            loading: false,
            list: action.payload.cryptoCurrencies,
            listFav: state.listFav
        };
        return newState;
    },
    [types.ERROR_FETCH_CRYTPO_CURRENCIES](state, action) {
        const newState = {
            loading: false,
            list: state.list,
            listFav: state.listFav
        }

        return newState;
    },
    [types.ADD_FAV_CRYPTO_CURRENCY](state, action) {
        const index = state.listFav.indexOf(action.payload.id);
        if (index == -1) {
            state.listFav.push(action.payload.id);
        }

        const newState = {
            loading: state.loading,
            list: state.list,
            listFav: state.listFav
        }
        
        return newState;
    },
    [types.REMOVE_FAV_CRYPTO_CURRENCY](state, action) {
        const index = state.listFav.indexOf(action.payload.id);
        if (index >= 0) {
            state.listFav.splice(index, 1);            
        }

        const newState = {
            loading: state.loading,
            list: state.list,
            listFav: state.listFav
        }
        
        return newState;
    }
});

