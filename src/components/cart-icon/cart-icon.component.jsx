import './cart-icon.styles.scss';
import { useContext } from 'react';
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
