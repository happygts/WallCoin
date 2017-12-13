import { combineReducers } from 'redux';
import * as cryptoCurrenciesReducer from './cryptoCurrency'
import * as myCoins from './myCoins'

import * as asyncInitialState from 'redux-async-initial-state';

export default asyncInitialState.outerReducer(combineReducers({
    ...cryptoCurrenciesReducer,
    ...myCoins
}));