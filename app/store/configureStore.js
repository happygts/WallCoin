import React from 'react'
import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'
import * as storage from 'redux-storage'

import {AsyncStorage} from 'react-native'

import * as asyncInitialState from 'redux-async-initial-state';

// import createEngine from 'redux-storage-engine-localstorage';
// const engine = createEngine('stateApp');

// // middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });
// const storageMiddleware = storage.createMiddleware(engine);

// Load state function 
// Should return promise that resolves application state 
const loadStore = () => {
  return new Promise(resolve => {
    AsyncStorage.getItem('@MySuperStore:key')
    .then(response => {
      console.log("response :", response);
      return JSON.parse(response)
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