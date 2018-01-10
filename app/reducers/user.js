import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';
import uuidv4 from 'uuid/v4'

const initialState = {
    connected: true,
    connecting: false,
    error: {
        isError: false,
        message: ""
    }
}

export const user = createReducer(initialState, {
    [types.START_LOGIN](state, action) {
        return update(state, {
            $merge: {
                connected: false,
                connecting: true,
                error: {
                    isError: false,
                    message: ""
                }
            }
        });
    },
    [types.SUCCESS_LOGIN](state, action) {
        return update(state, {
            $merge: {
                connected: true,
                connecting: false,
                error: {
                    isError: false,
                    message: ""
                }
            }
        });
    },
    [types.ERROR_LOGIN](state, action) {
        return update(state, {
            $merge: {
                connected: false,
                connecting: false,
                error: {
                    isError: true,
                    message: action.error.message
                }
            }
        });
     }
});