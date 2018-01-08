import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers';
import rootSaga from '../sagas/rootSagas'

//middlewares
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import saveInsideLocalStorageMiddleware from '../middleware/localStorageMiddleware'

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
const sagaMiddleware = createSagaMiddleware();

// Load state function 
const loadStore = () => {
  return new Promise(resolve => {
    AsyncStorage.getItem('@store:state')
      .then(response => {
        if (response) {
          const toReturn = JSON.parse(response);

          return toReturn;
        }
        return ({})
      })
      .then(resolve);
  });
}

function configureStore(initialState = {}) {
  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware,
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
      saveInsideLocalStorageMiddleware,
      asyncInitialState.middleware(loadStore)
    ),
  );
  return createStore(reducers, initialState, enhancer);
}

export {configureStore, sagaMiddleware};