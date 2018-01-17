import { combineReducers } from 'redux';
import * as store from './store';
import * as user from './user';
import * as request from './request'

import * as asyncInitialState from 'redux-async-initial-state';

export default asyncInitialState.outerReducer(combineReducers({
    ...store,
    ...user,
    ...request,
    asyncInitialState: asyncInitialState.innerReducer
}));