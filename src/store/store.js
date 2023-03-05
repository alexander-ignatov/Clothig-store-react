import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';

import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean)

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store