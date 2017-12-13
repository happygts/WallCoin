import * as types from './types'
import Api from '../lib/api'

export function createMyCoin(myCoin) {
    return (dispatch, getState) => {
        let state = getState();

        if (myCoin.id == "") {
            dispatch({
                type: types.CREATE_ONE_MY_COIN_ERROR,
                error: "You need to chose a crypto currency"
            });
        }
        else if (myCoin.quantity <= 0) {
            dispatch({
                type: types.CREATE_ONE_MY_COIN_ERROR,
                error: "You need to chose a valid quantity"
            });
        }
        else if (myCoin.buyingPrice <= 0) {
            dispatch({
                type: types.CREATE_ONE_MY_COIN_ERROR,
                error: "You need to chose a valie buyingPrice"
            });
        }
        else if (state.myCoins.find((myCoinState) => {
            return myCoinState.id == myCoin.id;
        })) {
            dispatch({
                type: types.CREATE_ONE_MY_COIN_ERROR,
                error: "MyCoin already exist"
            });
        }
        else {
            dispatch({
                type: types.CREATE_ONE_MY_COIN,
                payload: {
                    myCoin
                }
            });
            return true;
        }
        return false;
    }
}