import { createContext, useReducer } from 'react';
import { createAction } from '../utils/firebase/reducer/reducer.utils';
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  numberOfItems: 0,
  totalPrice: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  numberOfItems: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, numberOfItems, totalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = newCartItems => {
    const newNumberOfItems = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newTotalPrice = newCartItems.reduce(
      (total, currItem) => total + currItem.quantity * currItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        numberOfItems: newNumberOfItems,
        totalPrice: newTotalPrice,
      })
    );
  };

  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = itemToRemove => {
    const newCartItems = removeItem(cartItems, itemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = itemToClear => {
    const newCartItems = clearItem(cartItems, itemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = bool =>
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    numberOfItems,
    clearItemFromCart,
    totalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
