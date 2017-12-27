import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';
import uuidv4 from 'uuid/v4'

const initialState = false

export const connected = createReducer(initialState, {
    [types.SUCCESS_LOGIN](state, action) {
       return true; //tmp
    }
});