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
    [types.CREATE_ONE_MY_COIN_ERROR](state, action) {
        alert(action.error);
        return state;
    },
    [types.DELETE_ONE_MY_COIN](state, action) {
        var index = (state.findIndex((myCoinState) => {
            return myCoinState.id == action.payload.id;
        }))
        
        console.log("index :", index)
        if (index >= 0) {
            return update(state, {
                $splice: [[index, 1]]
            });
        }

        return state;
    },
});