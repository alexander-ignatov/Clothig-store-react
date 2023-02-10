import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd, numberOfItems) => {
  //Find if cartItems contain the productToAdd
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  //Increment if found
  if (existingCartItem) {
    return cartItems.map(cartItem => (
      cartItem.id === productToAdd.id
        ?  {...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem)
    )
  }
  
  //For a new product
  return [
    ...cartItems,
    {
      ...productToAdd,
      quantity:  1,
    },
  ];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  numberOfItems: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0)
  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  useEffect(()=> {
    const newNumberOfItems = cartItems.reduce((total, cartItem) => total+cartItem.quantity,0 )
    setNumberOfItems(newNumberOfItems)
  },[cartItems])

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, numberOfItems};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
