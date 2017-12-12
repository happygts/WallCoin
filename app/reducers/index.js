import { combineReducers } from 'redux';
import * as cryptoCurrenciesReducer from './cryptoCurrency'

export default combineReducers(Object.assign(
    cryptoCurrenciesReducer
));
