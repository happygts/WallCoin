import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

/**
 *  loading: Boolean,
 *  refreshing: Boolean,
 *  list : [id],
 *  request: [{
 *      data : {
 *          url: String,
 *          userId: String,
 *          data: [...data]
 *      },
 *      pagination: {
 *          current,
 *          size,
 *          totalItem
 *      },
 *  }],
 *  currentRequestIndex: Number
 */
const initialState = {
    loading: false,
    refreshing: false,
    requests: [],
    currentRequestIndex: -1
};

function createOneRequestReducer(name) {
    var name = name;

    return createReducer(initialState, {
        [types.START_LIST_DATA](state, action) {
            var namePayload = action.payload.name;

            if (name == namePayload) {
                return update(state, {
                    $merge: {
                        loading: true
                    }
                });
            }
            return state;
        },
        [types.SUCCESS_LIST_DATA](state, action) {
            var namePayload = action.payload.name;

            if (name == namePayload) {
                var data = action.payload.data.map(element => (element.id));
                var request = action.payload.request;
                var requestIndex = action.payload.requestIndex;

                return update(state, {
                    requests: {
                        $merge: {
                            [requestIndex] : request
                        }
                    },
                    loading: { $set: false },
                    currentRequestIndex: { $set : requestIndex }
                })
            }
            return state;
        },
        [types.NO_MORE_LIST_DATA](state, action) {
            var namePayload = action.payload.name;

            if (name == namePayload) {
                return update(state, {
                    $merge: {
                        loading: false
                    }
                })
            }
            return state;
        },
        [types.START_REFRESH_DATA](state, action) {
            var namePayload = action.payload.name;

            if (name == namePayload) {
                console.log("START_REFRESH_DATA");
                return update(state, {
                    $merge: {
                        refreshing: true
                    }
                });
            }
            return state;
        },
        [types.SUCCESS_REFRESH_DATA](state, action) {
            var namePayload = action.payload.name;

            if (name == namePayload) {
                return update(state, {
                    $merge: {
                        refreshing: false
                    }
                });
            }
            return state;
        }
    });
}

export const coins = createOneRequestReducer("coins");
export const portfolios = createOneRequestReducer("portfolios");
export const favorites = createOneRequestReducer("favorites");