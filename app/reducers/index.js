import { combineReducers } from 'redux';
import * as store from './store';
import * as user from './user';
import * as coins from './coins';
import * as myCoins from './myCoins';

// TO DELETE
import * as cryptoCurencies from './cryptoCurencies'
//

import * as asyncInitialState from 'redux-async-initial-state';

export default asyncInitialState.outerReducer(combineReducers({
    ...store,
    ...user,
    ...coins,
    ...cryptoCurencies,
    ...myCoins,
    asyncInitialState: asyncInitialState.innerReducer
}));