import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';
import uuidv4 from 'uuid/v4'

const initialState = []

export const myCoins = createReducer(initialState, {
    [types.CREATE_ONE_MY_COIN](state, action) {
        return update(state, {
            $push: [{
                id: action.payload.id,
                operations: [],
            }]
        });
    },
    [types.DELETE_ONE_MY_COIN](state, action) {
        var index = (state.findIndex((myCoinState) => {
            return myCoinState.id == action.payload.id;
        }))

        if (index >= 0) {
            return update(state, {
                $splice: [[index, 1]]
            });
        }

        return state;
    },
    [types.ADD_OPERATION_TO_ONE_MY_COIN](state, action) {
        let myCoinId = action.payload.myCoinId;
        let newOperation = action.payload.operation;
        newOperation.id = uuidv4();

        let index = (state.findIndex((myCoinState) => {
            return myCoinState.id == myCoinId;
        }));

        var updateReturn = update(state, {
            [index]: {
                operations: {
                    $push: [newOperation]
                }
            }
        });

        console.log("udpdateReturn :", updateReturn);
        return updateReturn;
    },
    [types.DELETE_OPERATION_FROM_ONE_MY_COIN](state, action) {
        let myCoinId = action.payload.myCoinId;
        let operationId = action.payload.operationId;

        let indexMyCoin = (state.findIndex((myCoinState) => {
            return myCoinState.id == myCoinId;
        }))

        if (indexMyCoin >= 0) {
            let indexOperation = (state[indexMyCoin].operations.findIndex((operation) => {
                return operation.id == operationId;
            }))

            if (indexOperation >= 0) {
                
                return update(state, {
                    [indexMyCoin]: {
                        operations: {
                            $splice: [[indexOperation, 1]]
                        }
                    } 
                });
            }
        }
        return state;
    },
    [types.EDIT_OPERATION_OF_ONE_MY_COIN](state, action) {
        let myCoinId = action.payload.myCoinId;
        let operationId = action.payload.operationId;
        let newOperation = action.payload.newOperation;

        let indexMyCoin = (state.findIndex((myCoinState) => {
            return myCoinState.id == myCoinId;
        }))

        if (indexMyCoin >= 0) {
            let indexOperation = (state[indexMyCoin].operations.findIndex((operation) => {
                return operation.id == operationId;
            }))
            if (indexOperation >= 0) {
                return update(state, {
                    [indexMyCoin]: {
                        operations: {
                            [indexOperation]: {
                                $merge: newOperation
                            }
                        }
                    } 
                });
            }
        }
        return state;
    }
});