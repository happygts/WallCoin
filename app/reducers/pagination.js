import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

/**
 *  loading: Boolean,
 * list : [id]
 */
const initialState = {
    loading: false,
    refreshing: false,
    list: [],
    pagination: {}
};

function createOnePaginationReducer(name) {
    var name = name;

    return createReducer(initialState, {
        [types.START_FETCH_NEXT_PAGE](state, action) {
            return update(state, {
                $merge: {
                    loading: true
                }
            });
        },
        [types.SUCCESS_FETCH_NEXT_PAGE](state, action) {
            var data = action.payload.data.map(element => (element.id));
            var pagination = action.payload.pagination;
    
            return update(state, {
                list: {
                    $push: data
                },
                pagination: {
                    $merge: pagination
                },
                loading: {$set: false}
            })
        },
        [types.NO_MORE_FETCH_PAGE](state, action) {
            return update(state, {
                $merge: {
                    loading: false
                }
            })
        },
        [types.START_REFRESH](state, action) {
            return update(state, {
                $merge: {
                    refreshing: true
                }
            });
        },
        [types.SUCCESS_REFRESH](state, action) {
            console.log("action :", action);
            return update(state, {
                $merge: {
                    refreshing: false
                }
            });
        }
    });
}

export const coins = createOnePaginationReducer("coins");