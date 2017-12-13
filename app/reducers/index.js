import { combineReducers } from 'redux';
import * as cryptoCurrenciesReducer from './cryptoCurrency'

import * as asyncInitialState from 'redux-async-initial-state';

// export default combineReducers({
//     ...cryptoCurrenciesReducer
// });

export default asyncInitialState.outerReducer(combineReducers({
    ...cryptoCurrenciesReducer,
    // We need innerReducer to store loading state, i.e. for showing loading spinner 
    asyncInitialState: asyncInitialState.innerReducer,
  }));