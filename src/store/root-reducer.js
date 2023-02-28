import { combineReducers } from 'redux';
import  userReducer  from './user/user.reducer';
import  categoriesReducer  from './categories/category.reducer';
import cartReducer from './cart/cart.reducer';

 const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer
});


export default rootReducer