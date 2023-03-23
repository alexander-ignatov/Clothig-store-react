import { AnyAction } from 'redux';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[]
}

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;

// import CART_ACTION_TYPES from "./cart.types";

// const CART_INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
//   cartCount: 0,
//   cartTotal: 0,
// };

// const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         ...payload,
//       };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       };
//     default:
//       return state
//   }
// };

// export default cartReducer
