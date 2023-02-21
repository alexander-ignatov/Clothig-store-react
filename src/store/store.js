import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

//Middlewares to log out the state before hitting the reducer
const middleWares = [logger]
const composedEnhancers = compose(applyMiddleware(...middleWares))

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store