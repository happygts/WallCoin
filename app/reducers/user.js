import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';
import uuidv4 from 'uuid/v4'

const initialState = {
    connected: false,
    activated: false,
    connecting: false,
    userId: '',
    currentPortfolioId: null,
    currentMyCoinId: null,
    currentOperationId: null,
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
        const userInfo = action.payload;

        return update(state, {
            $merge: {
                connected: true,
                activated: userInfo.status == "activated" ? true : false,
                connecting: false,
                userId: userInfo.userId,
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
    },    
    [types.START_LOGOUT](state, action) {
        return update(state, {
            $merge: {
                connected: false,
                connecting: false,
                userId: '',
                currentPortfolioId: null,
                currentMyCoinId: null,
                currentOperationId: null,
                error: {
                    isError: false,
                    message: ""
                }
            }
        });
    },
    [types.MODIFY_CURRENT_PORTFOLIOS_ID](state, action) {
        return update(state, {
            $merge: {
                currentPortfolioId: action.payload.currentPortfolioId,
            }
        });
    }
});