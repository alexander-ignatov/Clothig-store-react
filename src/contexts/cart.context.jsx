import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = itemToRemove => {
    setCartItems(removeItem(cartItems, itemToRemove));
  };

  const clearItemFromCart = itemToClear => {
    setCartItems(clearItem(cartItems, itemToClear));
  };

  useEffect(() => {
    const newNumberOfItems = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setNumberOfItems(newNumberOfItems);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, currItem) => total + currItem.quantity * currItem.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

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
