import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, numberOfItems } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{numberOfItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
