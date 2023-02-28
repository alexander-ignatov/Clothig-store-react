import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
  const isCartOpen = selectIsCartOpen();
  const cartCount = selectCartCount();
  const setIsCartOpenToggler = setIsCartOpen();

  const toggleIsCartOpen = () => setIsCartOpenToggler(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
