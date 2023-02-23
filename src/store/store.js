import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
// import logger from 'redux-logger';

import rootReducer from './root-reducer';

//Middlewares to log out the state before hitting the reducer

/*
Custom middleware because the redux one is hard for debugging. THe positive here is that everything os sequential.
If there isn't an action type in most cases it means that the action just isn't for this middleware
If there is then we log out what we need, pass the action forward and THEN log out the next state
*/
const loggerMiddleware = store => next => action => {
  if(!action.type) return next(action)

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('state: ', store.getState());

  next(action)

  console.log('next state: ', store.getState());
}


const middleWares = [loggerMiddleware]
const composedEnhancers = compose(applyMiddleware(...middleWares))

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store