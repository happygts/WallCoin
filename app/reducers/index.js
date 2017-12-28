import { combineReducers } from 'redux';
import * as user from './user'
import * as cryptoCurrenciesReducer from './cryptoCurrency'
import * as myCoins from './myCoins'

import * as asyncInitialState from 'redux-async-initial-state';

export default asyncInitialState.outerReducer(combineReducers({
    ...user,
    ...cryptoCurrenciesReducer,
    ...myCoins,
    asyncInitialState: asyncInitialState.innerReducer
}));