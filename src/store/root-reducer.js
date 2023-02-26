import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
 const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer
});


export default rootReducer