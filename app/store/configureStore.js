import React from 'react'
import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'

import {AsyncStorage} from 'react-native'

import * as asyncInitialState from 'redux-async-initial-state';

// // middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

// Load state function 
// Should return promise that resolves application state 
const loadStore = () => {
  return new Promise(resolve => {
    AsyncStorage.getItem('@store:state')
    .then(response => {
      if (response) {
        return JSON.parse(response)        
      }
      return ({})
    })
    .then(resolve);
  });

}

function configureStore(initialState = {}) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
      asyncInitialState.middleware(loadStore)
    ),
  );
  return createStore(reducers, initialState, enhancer);
}

export default configureStore;