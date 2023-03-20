import CART_ACTION_TYPES from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setIsCartOpen = bool =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = removeItem(cartItems, itemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, itemToClear) => {
  const newCartItems = clearItem(cartItems, itemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

const addCartItem = (cartItems, productToAdd) => {
  //Find if cartItems contain the productToAdd
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  //Increment if found
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //For a new product
  return [
    ...cartItems,
    {
      ...productToAdd,
      quantity: 1,
    },
  ];
};

const removeItem = (cartItems, itemToRemove) => {
  //Find item to remove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === itemToRemove.id
  );

  //It quantity is one - remove the item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
  }

  //Decrement quantity if found
  return cartItems.map(cartItem =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearItem = (cartItems, itemToRemove) =>
  cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
