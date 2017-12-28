import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

const initialState = {
    name: "",
    myCoins: [],
};

export const portfolios = createReducer(initialState, {
    [types.SUCCESS_GET_PORTFOLIOS](state, action) {
        console.log("action :", action);
        return state;
    },
});

