import './cart-icon.styles.scss';
import { useContext } from 'react';
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, numberOfItems } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count">{numberOfItems}</span>
    </div>
  );
};

export default CartIcon;
