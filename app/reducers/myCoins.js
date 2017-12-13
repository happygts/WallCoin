import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

const initialState = []

export const myCoins = createReducer(initialState, {
    [types.CREATE_ONE_MY_COIN](state, action) {
        return update(state, {
            $push: [action.payload.myCoin]
        });
    },
});