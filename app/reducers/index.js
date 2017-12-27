import { combineReducers } from 'redux';
import * as login from './login'
import * as cryptoCurrenciesReducer from './cryptoCurrency'
import * as myCoins from './myCoins'

import * as asyncInitialState from 'redux-async-initial-state';

export default asyncInitialState.outerReducer(combineReducers({
    ...login,
    ...cryptoCurrenciesReducer,
    ...myCoins,
    asyncInitialState: asyncInitialState.innerReducer
}));