import './cart-icon.styles.scss';
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';
const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
