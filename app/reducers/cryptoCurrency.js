import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const cryptoCurencies = createReducer({}, {
    [types.START_FETCH_CRYTPO_CURRENCIES](state, action) {
        let newState = {}
       
        return newState;
    }
});

